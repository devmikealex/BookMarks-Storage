const clc = require('cli-color')

const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log(clc.magentaBright('---MW Links'),)
    next()
})

router.route('/')
    .get(function(req, res) {
        res.send('links get-');
    })
    .post(function(req, res) {
        res.send('links post-');
    })

module.exports = router
