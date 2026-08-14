const normalPage = `
    <html>
        <body>
            <h1 class="blockquote-display featured mb-3">"Quote"</h1>
            <div class="blockquote-origin mb-3">
                <span>Author Name</span>
                <span>Work Name</span>
            </div>
        </body>
    </html>
`

const pageWithoutQuote = `
    <html>
        <body>
            <h1 class="blockquote-display featured mb-3"></h1>
            <div class="blockquote-origin mb-3">
                <span>Author Name</span>
                <span>Work Name</span>
            </div>
        </body>
    </html>
`

const pageWithoutAuthor = `
    <html>
        <body>
            <h1 class="blockquote-display featured mb-3">"Quote"</h1>
            <div class="blockquote-origin mb-3">
                <span></span>
                <span>Work Name</span>
            </div>
        </body>
    </html>
`

const pageWithoutWork = `
    <html>
        <body>
            <h1 class="blockquote-display featured mb-3">"Quote"</h1>
            <div class="blockquote-origin mb-3">
                <span>Author Name</span>
                <span></span>
            </div>
        </body>
    </html>
`

export { normalPage, pageWithoutAuthor, pageWithoutQuote, pageWithoutWork }
