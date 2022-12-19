const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args))
const { extract } = require('@extractus/article-extractor')

const c = require('mylogger/colors')
const Logger = require('mylogger')
const log = new Logger('silly', 'getURL', c.bgCyan + c.black)

async function geturlinfo(req, res) {
    const FUNC_NAME = '/geturlinfo'
    log.verbs('--- Start func ' + c.cyan + FUNC_NAME)
    log.debug('req.body =\r\n' + c.brightBlue, req.body)
    let { url } = req.body
    if (!url) return res.status(400).json({ message: 'Missing url parameter' })

    // try {
    //     const result = await fetch(url)
    //     const body = await result.text()
    //     const title = parseTitle(body)
    //     log.debug(c.brightGreen + title)
    //     res.json({ title })
    // } catch (e) {
    //     log.error(e.message)
    //     res.status(500).json({ message: e.message })
    // }

    try {
        const article = await extract(url, {
            wordsPerMinute: 600,
            descriptionTruncateLen: 1000,
            descriptionLengthThreshold: 600,
            contentLengthThreshold: 100,
        })
        delete article.content
        log.debug('Article for url:\r\n' + c.brightBlue, article)
        res.json(article)
    } catch (e) {
        log.error(e.message)
        res.status(500).json({ message: e.message })
    }
}
exports.geturlinfo = geturlinfo

function parseTitle(body) {
    let match = body.match(/<title>([^<]*)<\/title>/)
    if (!match || typeof match[1] !== 'string')
        throw new Error('Unable to parse the <title> tag')
    // log.debug(c.cyan + 'parseTitle match:' + c.brightYellow, match)
    return match[1]
}
