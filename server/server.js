console.log('')
console.log('---')

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
const { geturlinfo } = require('./common/geturlinfo')
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
app.post('/geturlinfo', (req, res) => geturlinfo(req, res))

app.listen(PORT, () => {
    // console.log()
    log.verbs('Start Express server / CORS-enabled')
    log.debug('Working Dir:', clc.yellow(process.cwd()))
    log.info('Server URL:', clc.yellowBright(`http://127.0.0.1:${PORT}`))
})
