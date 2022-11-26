const clc = require('cli-color')

const express = require('express')
const router = express.Router()

const { findTagsByFilters } = require("../common/bd-func")

const Link = require('../models/Link')

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log(clc.magentaBright('---MW Links'),)
    next()
})

router.route('/')
    .get((req, res) => findTagsByFilters(req, res, Link))
    .post(function(req, res) {
        res.send('links post-')
    })

router.post('/filters', (req, res) => findTagsByFilters(req, res, Link))

module.exports = router
