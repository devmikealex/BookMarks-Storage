const clc = require('cli-color')

const express = require('express')
const router = express.Router()

const c = require('mylogger/colors')
const Logger = require('mylogger')
const log = new Logger(undefined, 'TAGSCOUNT', c.brightYellow)

const Tag = require('../models/Tag')
const Link = require('../models/Link')

router.get('/sync', (req, res) => {
    log.debug(clc.greenBright('SYNC COUNTER') + ' processing')
    async function a() {
        // получить список всеъ тегов
        const allTags = await Tag.find({})
        log.info(clc.bold('Tag.find') + ` length = ${allTags.length}`)
        // для каждого тега запрсоить поиск и получить длину найденеого массива
        let info = []
        for (let index = 0; index < allTags.length; index++) {
            const tag = allTags[index]
            const res = await updateTag(tag)
            if (tag.counter !== res.counter) log.error(c.brightRed + 'DOES NOT MATCH')
            info.push(res)
            console.log('==========================================')
        }
        res.json(info)
    }
    a()
})

router.get('/sync/:id', (req, res) => {
    log.debug(
        clc.greenBright('SYNC COUNTER') + ' ID processing, req.params =',
        req.params
    )
    async function a() {
        const tag = { _id: req.params.id }
        const result = await updateTag(tag)
        res.json(result)
    }
    a()
})

router.get('/inc/:id', (req, res) => {
    log.debug(clc.greenBright('counterINC') + ' ID processing, req.params =', req.params)
    counterDecInc(req.params.id, 1, res)
})

router.get('/dec/:id', (req, res) => {
    log.debug(clc.greenBright('counterDEC') + ' ID processing, req.params =', req.params)
    counterDecInc(req.params.id, -1, res)
})

function counterDecInc(id, value, res) {
    Tag.findByIdAndUpdate(
        id,
        { $inc: { counter: value } },
        { new: true },
        function (err, doc) {
            if (err) {
                log.error(err)
                res.send(err.message)
            } else {
                log.silly('Updated TAG: ', doc)
                res.send(doc)
            }
        }
    )
}

module.exports = router

async function updateTag(tag) {
    log.debug(`${tag.title} - old: ${tag.counter}`)
    const tagsLinks = await Link.countDocuments({ tags: tag._id })
    log.debug(`New: ${tagsLinks}`)
    const res = await Tag.findByIdAndUpdate(
        tag._id,
        { counter: tagsLinks },
        { new: true }
    )
    console.log('res', res)
    console.log('------------------')
    return res
}
async function updateTag_old(tag) {
    log.debug(`${tag.title} - old: ${tag.counter}`)
    const tagsLinks = await Link.find({ tags: tag._id }, { _id: 1, title: 1 })
    log.debug(`New: ${tagsLinks.length}`)
    // сделать апдейт поля counter для текущцего тега
    const res = await Tag.findByIdAndUpdate(
        tag._id,
        { counter: tagsLinks.length },
        { new: true }
    )
    console.log('res', res)
    console.log('--------------------------------')
    return res
}
