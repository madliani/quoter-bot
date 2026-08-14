import type Chat from "@bot/lib/chat"
import type Database from "@lib/database"

import { Context } from "grammy"

function getChatId(ctx: Context): string | undefined {
    const chatId = ctx.chatId

    return chatId?.toString()
}

async function initChat<T>(ctx: Context, db: Database<Chat<T>>): Promise<void> {
    const chatId = getChatId(ctx)

    if (chatId !== undefined) {
        const chat: Readonly<Chat<T>> = { id: chatId, messages: [] }

        return await db.set(chatId, chat)
    }

    return undefined
}

export { getChatId, initChat }
