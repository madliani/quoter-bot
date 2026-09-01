import type Chat from "@bot/lib/chat"
import type Database from "@lib/database"
import type { QuoteWithAttribution } from "@lib/quotepark"

import TelegramBot from "@bot/bot"
import logger from "@lib/logger"
import RedisMock from "@lib/redis_mock"
import UpstashRedis from "@lib/upstash_redis"
import process from "node:process"

const MAIN_ERRORS = {
    ME001: "Token for Telegram bot is missing (ME001)",
    ME002: "Token for the Redis database by Upstash is missing (ME002)",
    ME003: "URL of Redis database by Upstash is missing (ME003)",
    ME004: "Frequency of messages sent by bot is missing (ME004)"
}

async function main(): Promise<void> {
    const {
        DEVELOPMENT_MODE,
        FREQUENCY,
        TELEGRAM_BOT_TOKEN,
        UPSTASH_REDIS_REST_TOKEN,
        UPSTASH_REDIS_REST_URL
    } = process.env

    if (TELEGRAM_BOT_TOKEN === undefined) {
        throw new ReferenceError(MAIN_ERRORS.ME001)
    }

    if (UPSTASH_REDIS_REST_TOKEN === undefined) {
        throw new ReferenceError(MAIN_ERRORS.ME002)
    }

    if (UPSTASH_REDIS_REST_URL === undefined) {
        throw new ReferenceError(MAIN_ERRORS.ME003)
    }

    if (FREQUENCY === undefined) {
        throw new ReferenceError(MAIN_ERRORS.ME004)
    }

    const db: Database<Chat<QuoteWithAttribution>> = DEVELOPMENT_MODE
        ? new RedisMock<Chat<QuoteWithAttribution>>()
        : new UpstashRedis<Chat<QuoteWithAttribution>>(
              UPSTASH_REDIS_REST_TOKEN,
              UPSTASH_REDIS_REST_URL
          )

    const telegramBot = new TelegramBot(TELEGRAM_BOT_TOKEN, db, FREQUENCY)

    await telegramBot.run()
}

try {
    await main()
} catch (err) {
    logger.error(err)

    process.exitCode = 1
}
