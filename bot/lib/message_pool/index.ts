import type Message from "@bot/lib/message"

class MessagePool<T> {
    private messages: Message<T>[] = []

    public clear(): void {
        this.messages = []
    }

    public getAll(): Message<T>[] {
        return this.messages
    }

    public getByChatId(chatId: string): Message<T>[] {
        return this.messages.filter(message => message.chatId === chatId)
    }

    public getById(id: string): Message<T>[] {
        return this.messages.filter(message => message.id === id)
    }

    public set(message: Message<T>): void {
        this.messages.push(message)
    }
}

export default MessagePool
