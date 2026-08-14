export default interface Message<T> {
    chatId: string
    data: T
    id: string
}
