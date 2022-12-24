const clc = require('cli-color')

const express = require('express')
const router = express.Router()

const { BDRequest } = require('../common/bd-func')

const c = require('mylogger/colors')
const Logger = require('mylogger')
const log = new Logger(undefined, 'TAGS', c.cyan)

const Tag = require('../models/Tag')
const Link = require('../models/Link')

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    log.http(clc.magentaBright('MW: Tags'))
    next()
})

router
    .route('/')
    .get((req, res) => BDRequest(req, res, Tag, 'find'))
    .post((req, res) => BDRequest(req, res, Tag, 'add'))
    .delete((req, res) => BDRequest(req, res, Tag, 'delete'))
    .patch((req, res) => BDRequest(req, res, Tag, 'patch'))

router.post('/filters', (req, res) => BDRequest(req, res, Tag, 'find'))

router.use('/createTestTags', (req, res) => createTestTags(req, res))

router.get('/synccounters', (req, res) => {
    log.debug(clc.cyan('SYNC COUNTER processing, req.params ='), req.params)
    async function a() {
        // получить список всеъ тегов
        const allTags = await Tag.find({})
        log.info(clc.bold('Tag.find') + ` length = ${allTags.length}`)
        // для каждого тега запрсоить поиск и получить длину найденеого массива
        let info = []
        for (let index = 0; index < allTags.length; index++) {
            const tag = allTags[index]
            log.debug(`${tag.title} - old: ${tag.counter}`)
            const tagsLinks = await Link.find({ tags: tag._id }, { _id: 1, title: 1 })
            console.log(tagsLinks)
            log.debug(`New: ${tagsLinks.length}`)
            console.log('--------------------------------')
            // сделать апдейт поля counter для текущцего тега
            Tag.findByIdAndUpdate(
                tag._id,
                { counter: tagsLinks.length },
                // { new: true },
                function (err, doc) {
                    if (err) {
                        log.error(err)
                        // res.send(err.message)
                    } else {
                        log.silly('Updated Link: ', doc)
                        // res.send(doc)
                    }
                    info.push(doc)
                }
            )
        }
        res.json(info)
    }
    a()
})

router.get('/:id', (req, res) => {
    log.debug(clc.cyan('ID processing, req.params ='), req.params)
    BDRequest(req, res, Tag, 'find')
})

module.exports = router

// async function findTags_old(req, res) {
//     let message, colorMessage
//     try {
//         console.log(clc.cyan('----FUNC: findTags'))
//         console.log('----BODY:\r\n', req.body)
//         const tag = await Tag.find(req.body)
//         console.log('▓ find\r\n', tag)
//         message = tag
//         colorMessage = clc.yellow('--- OK ---\r\n' + message)
//     } catch (err) {
//         res.status(500)
//         message = { message: err.message }
//         colorMessage = clc.redBright('--- ERROR ---\r\n' + err.message)
//     } finally {
//         console.log(colorMessage)
//         res.send(message)
//     }
// }

// async function getTagByID(req, res) {
//     let message, colorMessage
//     try {
//         console.log(clc.cyan('----FUNC: getTagByID:'), clc.green(`${req.params.id}`))
//         const tag = await Tag.findById(req.params.id)
//         console.log('▓ findById', tag)
//         message = tag
//         colorMessage = clc.yellow('--- OK ---\r\n' + message)
//     } catch (err) {
//         res.status(500)
//         message = { message: err.message }
//         colorMessage = clc.redBright('--- ERROR ---\r\n' + err.message)
//     } finally {
//         console.log(colorMessage)
//         res.json(message)
//     }
// }

async function createTestTags(req, res) {
    let message, colorMessage
    try {
        console.log(clc.cyan('----FUNC: createTestTags'))

        const result = await Tag.deleteMany({ title: { $regex: 'aaa' } })
        console.log('▓ result', result)

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
}
