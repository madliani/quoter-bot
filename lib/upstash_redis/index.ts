import type Database from "@lib/database"

import { Redis } from "@upstash/redis"

class UpstashRedis<T> implements Database<T> {
    private readonly redis: Redis

    constructor(token: string, url: string) {
        this.redis = new Redis({ token, url })
    }

    public async get(key: string): Promise<T | undefined> {
        const value = await this.redis.get<T>(key)

        if (value === null) {
            return undefined
        }

        return value
    }

    public async set(key: string, value: T): Promise<void> {
        const result = await this.redis.set(key, JSON.stringify(value))

        if (result === null) {
            return undefined
        }
    }
}

export default UpstashRedis
