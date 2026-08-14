import axios from "axios"
import * as cheerio from "cheerio"

export interface QuoteAttribution {
    author: string
    work: string | undefined
}

export type QuoteWithAttribution = { quote: string } & QuoteAttribution

async function fetchPage(url: string): Promise<string | undefined> {
    const page = await axios.get<string>(url)

    if (typeof page.data !== "string") {
        return undefined
    }

    return page.data
}

function parseAttribution(page: string): QuoteAttribution | undefined {
    const ATTRIBUTION_PATH = "div.blockquote-origin.mb-3"
    const WORK_ELEMENT_INDEX = 1

    const dom = cheerio.load(page)
    const attrElement = dom(ATTRIBUTION_PATH)
    const author = attrElement.children().first().text()
    const work = attrElement.children().eq(WORK_ELEMENT_INDEX).text()

    if (author === "") {
        return undefined
    }

    if (work === "") {
        return { author: author.trim(), work: undefined }
    }

    return { author: author.trim(), work: work.trim() }
}

function parsePage(page: string): QuoteWithAttribution | undefined {
    const quote = parseQuote(page)
    const attr = parseAttribution(page)

    if (attr === undefined) {
        return undefined
    }

    if (quote === undefined) {
        return undefined
    }

    return { ...attr, quote }
}

function parseQuote(page: string): string | undefined {
    const QUOTE_PATH = "h1.blockquote-display.featured.mb-3"
    const INITIAL_QUOTE_INDEX = 1
    const FINAL_QUOTE_INDEX = -1

    const dom = cheerio.load(page)
    const quote = dom(QUOTE_PATH).text()

    if (quote === "") {
        return undefined
    }

    return quote.trim().slice(INITIAL_QUOTE_INDEX, FINAL_QUOTE_INDEX)
}

async function scrape(): Promise<QuoteWithAttribution | undefined> {
    const URL = "https://quotepark.com/quotes/random-quote"

    const page = await fetchPage(URL)

    if (page === undefined) {
        return undefined
    }

    return parsePage(page)
}

export { fetchPage, parseAttribution, parsePage, parseQuote }

export default { scrape }
