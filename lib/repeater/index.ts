export type RepeaterCallback = () => void

class Repeater {
    public get isRunning() {
        return this.isActive
    }

    private id: NodeJS.Timeout | undefined

    private isActive = false

    public set(callback: RepeaterCallback, frequency: number): void {
        this.id = setInterval(callback, frequency)
        this.isActive = true
    }

    public unset(): void {
        clearInterval(this.id)

        this.isActive = false
    }
}

function hoursToMilliseconds(hours: number): number {
    return hours * 60 * 60 * 1_000
}

function minutesToMilliseconds(minutes: number): number {
    return minutes * 60 * 1_000
}

function secondsToMilliseconds(seconds: number): number {
    return seconds * 1_000
}

export { hoursToMilliseconds, minutesToMilliseconds, secondsToMilliseconds }

export default Repeater
