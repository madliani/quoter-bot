import type Message from "@bot/lib/message"
import type MessagePool from "@bot/lib/message_pool"
import type { QuoteWithAttribution } from "@lib/quotepark"

import { getChatId } from "@bot/lib/chat_utils"
import quotepark from "@lib/quotepark"
import { Context } from "grammy"
import { randomUUID } from "node:crypto"

async function sendQuote(
    ctx: Context,
    messagePool: MessagePool<QuoteWithAttribution>
): Promise<void> {
    const quoteWithAttr = await quotepark.scrape()
    const chatId = getChatId(ctx)

    if (quoteWithAttr !== undefined && chatId !== undefined) {
        const { author, quote, work } = quoteWithAttr

        const text = work
            ? `«${quote}»\n\n© ${author}, «${work}»`
            : `«${quote}»\n\n© ${author}`

        await ctx.reply(text)

        const message: Readonly<Message<QuoteWithAttribution>> = {
            chatId,
            data: { author, quote, work },
            id: randomUUID()
        }

        messagePool.set(message)
    }
}

export { sendQuote }
