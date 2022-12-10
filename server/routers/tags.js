const clc = require('cli-color')

const express = require('express')
const router = express.Router()

const { BDRequest } = require('../common/bd-func')

const c = require('mylogger/colors')
const Logger = require('mylogger')
const log = new Logger(undefined, 'TAGS', c.cyan)

const Tag = require('../models/Tag')

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

router.post('/filters', (req, res) => BDRequest(req, res, Tag, 'find'))

router.use('/createTestTags', (req, res) => createTestTags(req, res))

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
