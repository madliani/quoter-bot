export default interface Database<T> {
    get(key: string): Promise<T | undefined>
    set(key: string, value: T): Promise<void>
}
