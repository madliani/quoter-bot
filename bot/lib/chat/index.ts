import type Message from "@bot/lib/message"

export default interface Chat<T> {
    id: string
    messages: Message<T>[]
}
