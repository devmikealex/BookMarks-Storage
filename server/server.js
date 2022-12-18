console.log('')
console.log('---')

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args))
const mongoose = require('mongoose')
const Link = require('./models/Link')
const Tag = require('./models/Tag')

const express = require('express')
const cors = require('cors')
const linksRouter = require('./routers/links')
const tagsRouter = require('./routers/tags')

const multer = require('multer')
// const upload = multer({ dest: './public/images/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, Buffer.from(file.originalname, 'latin1').toString('utf8'))
    },
})
const upload2 = multer({ storage: storage })

const clc = require('cli-color')

const BD_NAME = 'test'
const BD_URL = `mongodb://localhost:27017/${BD_NAME}`

const c = require('mylogger/colors')
const Logger = require('mylogger')
const log = new Logger(undefined, 'MAIN', c.bgGreen + c.black)

log.verbs('BD connection...')
mongoose.connect(BD_URL, (e) => {
    log.verbs('BD connect ended')
    if (e) {
        log.error('BD connect error =', e.message)
    }
})

const PORT = process.env.PORT || 3018
const app = express()
app.use(express.json())
app.use(cors())

const options = {
    setHeaders: function (res, path) {
        log.http(clc.magentaBright('MW static:'), clc.green(path))
    },
}
app.use('/static', express.static('public', options))
app.use(express.static('../client/build', options))
app.use((req, res, next) => {
    console.log('')
    log.http(clc.magentaBright('MW:'), clc.green(req.method), req.originalUrl)
    log.http(clc.cyanBright('MW: query ='), req.query)
    next()
})

app.use('/tags', tagsRouter)
app.use('/links', linksRouter)
app.use('/uploadfile', upload2.any(), function (req, res, next) {
    for (const file of req.files) {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
    }
    log.debug('Files for UPLOAD' + c.brightBlue, req.files)
    // console.log('body', req.body)
    res.json(req.files)
})
app.post('/geturlinfo', (req, res) => {
    const FUNC_NAME = '/geturlinfo'
    log.verbs('--- Start func ' + c.cyan + FUNC_NAME)
    log.debug('req.body =\r\n' + c.brightBlue, req.body)
    let { url } = req.body

    if (!url) return res.status(400).json({ message: 'Missing url parameter' })

    fetch(url)
        .then((res) => res.text()) // parse response's body as text
        .then((body) => parseTitle(body)) // extract <title> from body
        .then((title) => {
            log.debug(c.brightGreen + title)
            res.json({ title })
        })
        .catch((e) => {
            log.error(e.message)
            res.status(500).json({ message: e.message })
        })

    function parseTitle(body) {
        let match = body.match(/<title>([^<]*)<\/title>/)
        if (!match || typeof match[1] !== 'string')
            throw new Error('Unable to parse the <title> tag')
        // log.debug(c.cyan + 'parseTitle match:' + c.brightYellow, match)
        return match[1]
    }
})

// app.get('/', function (req, res) {
//     res.send('Main page WIP')
// })

// app.get('/linkss', async function (req, res) {
//     let message, colorMessage
//     try {
//         console.log('SERVER--LINKs')
//         const a = await (await Link.findOne({ url: 'dfgdgdffff' })).populate('tags')
//         message = a
//         colorMessage = clc.yellow('--- OK ---\r\n' + message)
//     } catch (err) {
//         res.status(500)
//         message = { message: err.message }
//         colorMessage = clc.redBright('--- ERROR ---\r\n' + err.message)
//     } finally {
//         console.log(colorMessage)
//         res.send(message)
//     }
// })

// app.post('/linkss', async function (req, res) {
//     let message, colorMessage
//     try {
//         console.log('SERVER--LINKs')
//         const link = req.body
//         console.log(link)

//         const a = await Tag.findOne({ title: 'JavaScript' })
//         console.log('🚀 ~ file: server.js ~ line 60 ~ a', a)
//         link.tags = a._id
//         const b = await Tag.findOne({ title: 'YouTube' })
//         console.log('🚀 ~ file: server.js ~ line 60 ~ b', b)
//         link.tags = [a._id, b._id]

//         console.log(link)
//         // link.url += '--aaaaaaaa00'
//         const linkDB = await Link.create(link)
//         console.log('linkDB', linkDB)

//         message = linkDB
//         colorMessage = clc.yellow('--- OK ---\r\n' + message)
//     } catch (err) {
//         res.status(500)
//         message = { message: err.message }
//         colorMessage = clc.redBright('--- ERROR ---\r\n' + err.message)
//     } finally {
//         console.log(colorMessage)
//         res.send(message)
//     }
// })

// app.use(function (req, res, next) {
//     res.status(404)
//     res.json({ error: 'Not found' })
// })

app.listen(PORT, () => {
    // console.log()
    log.verbs('Start Express server / CORS-enabled')
    log.debug('Working Dir:', clc.yellow(process.cwd()))
    log.info('Server URL:', clc.yellowBright(`http://127.0.0.1:${PORT}`))
})
