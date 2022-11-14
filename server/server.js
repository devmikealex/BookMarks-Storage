const mongoose = require('mongoose')
const Link = require('./models/Link')
const Tag = require('./models/Tag')

const express = require('express')
const linksRouter = require('./routers/links')
const tagsRouter = require('./routers/tags')
const clc = require('cli-color')

mongoose.connect('mongodb://localhost:27017/test', (e) =>
    console.log('BD connect e =', e)
)

const PORT = process.env.PORT || 3018
const app = express()
const options = {
    setHeaders: function (res, path) {
        console.log(clc.magentaBright('---MW static:'), clc.green(path))
    }}
app.use(express.static('public', options)) // we start from the parent folder
app.use(express.json())
app.use((req, res, next) => {
    console.log()
    console.log(clc.magentaBright('---MW:'), clc.green(req.method), req.originalUrl)
    console.log(clc.cyanBright('---QUERY:'), req.query)
    next()
})

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/tagss', async function (req, res) {
    let message, colorMessage
    try {
        console.log('SERVER--TAGs')
        const tag1 = await Tag.create({ title: 'JavaScript' })
        console.log('▓ tag1', tag1)
        const tag2 = await Tag.create({ title: 'Photoshop' })
        console.log('▓ tag2', tag2)
        const tag3 = await Tag.create({ title: 'YouTube' })
        console.log('▓ tag3', tag3)

        message = 'Tags created'
        colorMessage = clc.yellow('--- OK ---\r\n' + message)
    } catch (err) {
        res.status(500)
        message = { message: err.message }
        colorMessage = clc.redBright('--- ERROR ---\r\n' + err.message)
    } finally {
        console.log(colorMessage)
        res.send(message)
    }
})

app.use('/tags', tagsRouter)
app.use('/links', linksRouter)

app.get('/linkss', async function (req, res) {
    let message, colorMessage
    try {
        console.log('SERVER--LINKs')
        const a = await (await Link.findOne({ url: 'dfgdgdffff' })).populate('tags')
        message = a
        colorMessage = clc.yellow('--- OK ---\r\n' + message)
    } catch (err) {
        res.status(500)
        message = { message: err.message }
        colorMessage = clc.redBright('--- ERROR ---\r\n' + err.message)
    } finally {
        console.log(colorMessage)
        res.send(message)
    }
})

app.post('/linkss', async function (req, res) {
    let message, colorMessage
    try {
        console.log('SERVER--LINKs')
        const link = req.body
        console.log(link)

        const a = await Tag.findOne({ title: 'JavaScript' })
        console.log('🚀 ~ file: server.js ~ line 60 ~ a', a)
        link.tags = a._id
        const b = await Tag.findOne({ title: 'YouTube' })
        console.log('🚀 ~ file: server.js ~ line 60 ~ b', b)
        link.tags = [a._id, b._id]

        console.log(link)
        // link.url += '--aaaaaaaa00'
        const linkDB = await Link.create(link)
        console.log('linkDB', linkDB)

        message = linkDB
        colorMessage = clc.yellow('--- OK ---\r\n' + message)
    } catch (err) {
        res.status(500)
        message = { message: err.message }
        colorMessage = clc.redBright('--- ERROR ---\r\n' + err.message)
    } finally {
        console.log(colorMessage)
        res.send(message)
    }
})

app.listen(PORT, () => {
    console.log()
    console.log('Start server')
    console.log('Working Dir:', process.cwd())
    console.log(clc.yellowBright(`http://127.0.0.1:${PORT}`))
})
