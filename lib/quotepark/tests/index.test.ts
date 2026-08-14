import quotepark, {
    fetchPage,
    parseAttribution,
    parsePage,
    parseQuote
} from "@lib/quotepark"
import {
    normalPage,
    pageWithoutAuthor,
    pageWithoutQuote,
    pageWithoutWork
} from "@lib/quotepark/tests/mocks/index.mock"
import axios from "axios"
import { afterEach, describe, expect, it, vi } from "vitest"

vi.mock("axios", () => ({ default: { get: vi.fn<() => void>() } }))

describe("QuotePark scraper", () => {
    const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> }

    afterEach(() => {
        mockedAxios.get.mockReset()
    })

    describe("parseAttribution", () => {
        it("extracts author and work properly and trims", () => {
            const attr = parseAttribution(normalPage)

            expect(attr).toEqual({ author: "Author Name", work: "Work Name" })
        })

        it("throws error if author is empty", () => {
            const attr = parseAttribution(pageWithoutAuthor)

            expect(attr).toBe(undefined)
        })

        it("returns only author if work is empty", () => {
            const attr = parseAttribution(pageWithoutWork)

            expect(attr).toEqual({ author: "Author Name" })
        })
    })

    describe("parseQuote", () => {
        it("extracts and trims the quote without quotes", () => {
            const quote = parseQuote(normalPage)

            expect(quote).toBe("Quote")
        })

        it("throws error if quote is empty", () => {
            const quote = parseQuote(pageWithoutQuote)

            expect(quote).toBe(undefined)
        })
    })

    describe("parsePage", () => {
        it("combines quote and attribution to Quote object", () => {
            const page = parsePage(normalPage)

            expect(page).toEqual({
                author: "Author Name",
                quote: "Quote",
                work: "Work Name"
            })
        })
    })

    describe("fetchPage", () => {
        it("returns page data when axios get is successful and data is string", async () => {
            mockedAxios.get.mockResolvedValue({ data: normalPage })

            const page = await fetchPage(
                "https://quotepark.com/quotes/random-quote"
            )

            expect(page).toBe(normalPage)
        })

        it("throws TypeError if data is not a string", async () => {
            mockedAxios.get.mockResolvedValue({ data: 123 })

            expect(
                await fetchPage("https://quotepark.com/quotes/random-quote")
            ).toBe(undefined)
        })

        it("throws error if axios throws", async () => {
            mockedAxios.get.mockRejectedValue(new Error("Network error"))

            await expect(
                fetchPage("https://quotepark.com/quotes/random-quote")
            ).rejects.toThrow(undefined)
        })
    })

    describe("scrape", () => {
        it("fetches page and parses the quote", async () => {
            mockedAxios.get.mockResolvedValue({ data: normalPage })

            const quote = await quotepark.scrape()

            expect(quote).toEqual({
                author: "Author Name",
                quote: "Quote",
                work: "Work Name"
            })
        })
    })
})
