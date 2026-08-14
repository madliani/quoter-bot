import type Database from "@lib/database"

class RedisMock<T> implements Database<T> {
    private map = new Map<string, T>()

    public async get(key: string): Promise<T | undefined> {
        const value = this.map.get(key)

        if (value === undefined) {
            return undefined
        }

        return value
    }

    public async set(key: string, value: T): Promise<void> {
        this.map.set(key, value)
    }
}

export default RedisMock
