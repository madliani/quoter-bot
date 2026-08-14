declare namespace NodeJS {
    interface ProcessEnv {
        DEVELOPMENT_MODE?: boolean
        FREQUENCY?: number
        TELEGRAM_BOT_TOKEN?: string
        UPSTASH_REDIS_REST_TOKEN?: string
        UPSTASH_REDIS_REST_URL?: string
    }
}
