const clc = require('cli-color')

const express = require('express')
const router = express.Router()

const Tag = require('../models/Tag')

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log(clc.magentaBright('----MW Tags'))
    next()
})

router
    .route('/')
    .get((req, res) => findTagsByFilters(req, res, Tag))
    .post(function (req, res) {
        res.send('tag post-')
    })

router.post('/filters', (req, res) => findTagsByFilters(req, res, Tag))

router.get('/:id', (req, res) => {
    console.log(clc.cyanBright('----req.params:'), req.params)
    findTagsByFilters(req, res, Tag)
})

router.use('/createTestTags', (req, res) => createTestTags(req, res))

module.exports = router

// ---------------

async function findTagsByFilters(req, res, BD) {
    let message, colorMessage
    try {
        console.log(clc.cyan('----FUNC: findTagsByFilters'))
        console.log('----BODY:\r\n', req.body)
        console.log()

        let filter = req.body

        if (req.params.id) {
            console.log('----ID detected:', req.params.id)
            filter = { _id: req.params.id }
        }
        // filter = { 'title' : { '$regex' : 'Ph', '$options' : 'i' } }
        console.log("filter:", filter)
        const tags = await BD.find(filter)
        console.log(`▓ find tags returned ${tags.length}:`)
        console.log(JSON.stringify(tags, null, 2))
        
        message = tags
        colorMessage = clc.yellow('--- OK ---')
    } catch (err) {
        res.status(500)
        message = { message: err.message }
        colorMessage = clc.redBright('--- ERROR ---\r\n' + err.message)
    } finally {
        console.log(colorMessage)
        res.json(message)
    }
}





async function findTags_old(req, res) {
    let message, colorMessage
    try {
        console.log(clc.cyan('----FUNC: findTags'))
        console.log('----BODY:\r\n', req.body)
        const tag = await Tag.find(req.body)
        console.log('▓ find\r\n', tag)
        message = tag
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

async function getTagByID(req, res) {
    let message, colorMessage
    try {
        console.log(clc.cyan('----FUNC: getTagByID:'), clc.green(`${req.params.id}`))
        const tag = await Tag.findById(req.params.id)
        console.log('▓ findById', tag)
        message = tag
        colorMessage = clc.yellow('--- OK ---\r\n' + message)
    } catch (err) {
        res.status(500)
        message = { message: err.message }
        colorMessage = clc.redBright('--- ERROR ---\r\n' + err.message)
    } finally {
        console.log(colorMessage)
        res.json(message)
    }
}

async function createTestTags(req, res) {
    let message, colorMessage
    try {
        console.log(clc.cyan('----FUNC: createTestTags'))
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
