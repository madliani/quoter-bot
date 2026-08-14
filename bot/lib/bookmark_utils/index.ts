import type Chat from "@bot/lib/chat"
import type Database from "@lib/database"
import type { QuoteWithAttribution } from "@lib/quotepark"

import BookmarkJSON from "@bot/lib/bookmark_utils/assets/json/bookmark.json"
import { getChatId } from "@bot/lib/chat_utils"
import MessagePool from "@bot/lib/message_pool"
import { getLastElement } from "@lib/array_utils"
import { Context } from "grammy"

export type BookmarkCommand = () => Promise<void>

async function guardBookmarkCommand(
    isBotActive: boolean,
    ctx: Context,
    command: BookmarkCommand
): Promise<void> {
    if (isBotActive) {
        await command()
    } else {
        await ctx.reply(BookmarkJSON.bookmark__guard_blocked)
    }
}

async function onBookmarks(
    ctx: Context,
    db: Database<Chat<QuoteWithAttribution>>
): Promise<void> {
    const chatId = getChatId(ctx)

    if (chatId !== undefined) {
        const chat = await db.get(chatId)

        if (chat !== undefined && chat.messages.length !== 0) {
            await ctx.reply(BookmarkJSON.bookmark__list_success)

            for (const [bookmarkIndex, bookmark] of chat.messages.entries()) {
                const { author, quote, work } = bookmark.data

                const messageText = work
                    ? `[${bookmarkIndex + 1}]:\n«${quote}»\n\n© ${author}, «${work}»`
                    : `[${bookmarkIndex + 1}]:\n«${quote}»\n\n© ${author}`

                await ctx.reply(messageText)
            }
        }

        if (chat !== undefined && chat.messages.length === 0) {
            await ctx.reply(BookmarkJSON["bookmark__list_is-empty"])
        }
    }
}

async function onClearBookmark(
    ctx: Context,
    db: Database<Chat<QuoteWithAttribution>>
): Promise<void> {
    const chatId = getChatId(ctx)

    if (chatId !== undefined) {
        const chat = await db.get(chatId)

        if (chat !== undefined && chat.messages.length === 0) {
            await ctx.reply(BookmarkJSON["bookmark__clear_already-cleared"])

            return
        }

        if (chat !== undefined && chat.messages.length !== 0) {
            chat.messages = []
            await db.set(chatId, chat)

            await ctx.reply(BookmarkJSON.bookmark__clear_success)
        }
    }
}

async function onDeleteBookmark(
    ctx: Context,
    db: Database<Chat<QuoteWithAttribution>>
): Promise<void> {
    const chatId = getChatId(ctx)

    if (chatId !== undefined) {
        const chat = await db.get(chatId)

        if (chat !== undefined && chat.messages.length === 0) {
            await ctx.reply(BookmarkJSON["bookmark__list_is-empty"])

            return
        }
    }

    const indexString = ctx.match

    if (typeof indexString !== "string") {
        await ctx.reply(BookmarkJSON["bookmark__delete_no-number"])

        return
    }

    const indexNumber = parseInt(indexString) - 1

    if (isNaN(indexNumber)) {
        await ctx.reply(BookmarkJSON["bookmark__delete_invalid-number"])

        return
    }

    if (chatId !== undefined) {
        const chat = await db.get(chatId)

        if (chat !== undefined) {
            if (indexNumber < 0 || indexNumber >= chat.messages.length) {
                await ctx.reply(BookmarkJSON["bookmark__delete_out-of-range"])

                return
            }

            chat.messages.splice(indexNumber, 1)
            await db.set(chatId, chat)

            await ctx.reply(BookmarkJSON.bookmark__delete_success)
        }
    }
}

async function onSaveBookmark(
    ctx: Context,
    db: Database<Chat<QuoteWithAttribution>>,
    messagePool: MessagePool<QuoteWithAttribution>
): Promise<void> {
    const chatId = getChatId(ctx)

    if (chatId !== undefined) {
        const messages = messagePool.getByChatId(chatId)
        const lastMessage = getLastElement(messages)
        const chat = await db.get(chatId)

        if (lastMessage !== undefined && chat !== undefined) {
            if (!chat.messages.find(message => message.id === lastMessage.id)) {
                chat.messages.push(lastMessage)
                await db.set(chatId, chat)

                await ctx.reply(BookmarkJSON.bookmark__save_success)
            } else {
                await ctx.reply(BookmarkJSON.bookmark__save_error)
            }
        }
    }
}

export {
    guardBookmarkCommand,
    onBookmarks,
    onClearBookmark,
    onDeleteBookmark,
    onSaveBookmark
}
