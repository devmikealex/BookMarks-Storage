const clc = require('cli-color')

const express = require('express')
const router = express.Router()

const { findTagsByFilters, BDRequest } = require('../common/bd-func')

const Link = require('../models/Link')

const c = require('mylogger/colors')
const Logger = require('mylogger')
const log = new Logger(undefined, 'LINKS', c.green)

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log(clc.magentaBright('---MW Links'))
    next()
})

router
    .route('/')
    // .get((req, res) => findTagsByFilters(req, res, Link))
    .get((req, res) => BDRequest(req, res, Link, 'find'))
    .post((req, res) => BDRequest(req, res, Link, 'add'))
    .delete((req, res) => BDRequest(req, res, Link, 'delete'))
    .patch((req, res) => BDRequest(req, res, Link, 'patch'))
// .post(function (req, res) {
//     res.send('links post-')
// })

router.post('/filters', (req, res) => BDRequest(req, res, Link, 'find'))
// router.post('/filters', (req, res) => findTagsByFilters(req, res, Link))

router.get('/countinc/:id', (req, res) => {
    log.debug(clc.cyan('countinc ID processing, req.params ='), req.params)
    Link.findByIdAndUpdate(
        req.params.id,
        { $inc: { clicks: 1 } },
        { new: true },
        function (err, doc) {
            if (err) {
                log.error(err)
                res.send(err.message)
            } else {
                log.silly('Updated Link: ', doc)
                res.send(doc)
            }
        }
    )
})

router.get('/tag/:id', (req, res) => {
    async function test() {
        let data
        try {
            // contains only tags where tagName is 'YouTube' or 'politics'
            // data = await Link.find().populate({
            //     path: 'tags',
            //     match: { title: { $in: ['YouTube', 'politics'] } },
            // })

            data = await Link.find({ tags: req.params.id }).populate('tags')
            console.log('DATA', data)
        } catch (err) {
            console.log(err)
        }
        res.json(data)
    }
    test()
})

router.get('/:id', (req, res) => {
    log.debug(clc.cyan('ID processing, req.params ='), req.params)
    BDRequest(req, res, Link, 'find')
})

module.exports = router
