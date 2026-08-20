import type Chat from "@bot/lib/chat"
import type Database from "@lib/database"
import type { QuoteWithAttribution } from "@lib/quotepark"

import BotJSON from "@bot/assets/json/bot.json"
import {
    guardBookmarkCommand,
    onBookmarks,
    onClearBookmark,
    onDeleteBookmark,
    onSaveBookmark
} from "@bot/lib/bookmark_utils"
import BotCommand from "@bot/lib/bot_command"
import { getChatId, initChat } from "@bot/lib/chat_utils"
import MessagePool from "@bot/lib/message_pool"
import { sendQuote } from "@bot/lib/quote_utils"
import logger from "@lib/logger"
import Repeater, { minutesToMilliseconds } from "@lib/repeater"
import { Bot, BotError, Context, GrammyError } from "grammy"
import process from "node:process"

class TelegramBot {
    private readonly bot: Bot<Context>
    private readonly db: Database<Chat<QuoteWithAttribution>>
    private readonly frequency: number

    private readonly messagePool: MessagePool<QuoteWithAttribution>
    private readonly quoteRepeater: Repeater

    constructor(
        token: string,
        db: Database<Chat<QuoteWithAttribution>>,
        frequency: number
    ) {
        this.bot = new Bot<Context>(token)
        this.db = db
        this.frequency = frequency

        this.messagePool = new MessagePool<QuoteWithAttribution>()
        this.quoteRepeater = new Repeater()
    }

    public async run(): Promise<void> {
        this.setupGracefulShutdown()
        this.setupErrorHandling()

        this.setupCommands()
        this.setupSuggestions()

        await this.bot.start()
    }

    private async onError(err: BotError<Context>): Promise<void> {
        const HTTP_FORBIDDEN = 403
        const HTTP_CONFLICT = 409

        const { ctx } = err
        const chatId = getChatId(ctx)

        const isBotBlocked =
            err.error instanceof GrammyError &&
            err.error.error_code === HTTP_FORBIDDEN &&
            chatId !== undefined

        const isRequestConflict =
            err.error instanceof GrammyError &&
            err.error.error_code === HTTP_CONFLICT &&
            chatId !== undefined

        if (isBotBlocked && chatId !== undefined) {
            logger.error(`Chat with identifier ${chatId} was blocked by user.`)

            return
        }

        if (isRequestConflict) {
            logger.error("Another bot instance is running.")

            return
        }

        await ctx.reply(`ERROR:\n${err.message}`)
        logger.error(err.message)
    }

    private async onGracefulShutdown(quoteRepeater: Repeater): Promise<void> {
        quoteRepeater.unset()

        await this.bot.stop()
    }

    private async onHelp(ctx: Context): Promise<void> {
        const helpText = `${BotJSON.bot__help_overview}\n\n${BotJSON.bot__help_commands}\n\n${BotJSON.bot__help_attributions}`

        await ctx.reply(helpText)
    }

    private async onStart(ctx: Context): Promise<void> {
        if (this.bot.isRunning()) {
            this.quoteRepeater.unset()
        }

        const chatId = getChatId(ctx)

        if (chatId !== undefined) {
            const chat = await this.db.get(chatId)

            if (chat === undefined) {
                initChat(ctx, this.db)
            }

            await sendQuote(ctx, this.messagePool)

            this.quoteRepeater.set(
                async () => await sendQuote(ctx, this.messagePool),
                minutesToMilliseconds(this.frequency)
            )
        }
    }

    private async onStop(ctx: Context): Promise<void> {
        if (this.quoteRepeater.isRunning) {
            this.quoteRepeater.unset()

            await ctx.reply(BotJSON["bot__stop_success"])
        } else {
            await ctx.reply(BotJSON["bot__stop_error"])
        }
    }

    private setupCommands(): void {
        this.bot.command(BotCommand.HELP, ctx => this.onHelp(ctx))
        this.bot.command(BotCommand.START, ctx => this.onStart(ctx))
        this.bot.command(BotCommand.STOP, async ctx => this.onStop(ctx))

        this.bot.command("bookmarks", (ctx: Context) =>
            guardBookmarkCommand(this.quoteRepeater.isRunning, ctx, () =>
                onBookmarks(ctx, this.db)
            )
        )
        this.bot.command("savebookmark", (ctx: Context) =>
            guardBookmarkCommand(this.quoteRepeater.isRunning, ctx, () =>
                onSaveBookmark(ctx, this.db, this.messagePool)
            )
        )
        this.bot.command("deletebookmark", (ctx: Context) =>
            guardBookmarkCommand(this.quoteRepeater.isRunning, ctx, () =>
                onDeleteBookmark(ctx, this.db)
            )
        )
        this.bot.command("clearbookmarks", (ctx: Context) =>
            guardBookmarkCommand(this.quoteRepeater.isRunning, ctx, () =>
                onClearBookmark(ctx, this.db)
            )
        )
    }

    private setupErrorHandling(): void {
        this.bot.catch(this.onError)
    }

    private setupGracefulShutdown(): void {
        process.once("SIGINT", () =>
            this.onGracefulShutdown(this.quoteRepeater)
        )
        process.once("SIGTERM", () =>
            this.onGracefulShutdown(this.quoteRepeater)
        )
    }

    private async setupSuggestions(): Promise<void> {
        await this.bot.api.setMyCommands([
            { command: "bookmarks", description: "View bookmarks" },
            { command: "clearbookmarks", description: "Clear bookmarks" },
            {
                command: "deletebookmark",
                description: "Delete a bookmark by index"
            },
            { command: "help", description: "Get help with the bot" },
            { command: "savebookmark", description: "Save the last quote" },
            { command: "start", description: "Start the bot" },
            { command: "stop", description: "Stop the bot activity" }
        ])
    }
}

export default TelegramBot
