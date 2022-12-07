const clc = require('cli-color')

const c = require('mylogger/colors')
const Logger = require('mylogger')
const Link = require('../models/Link')
const log = new Logger(undefined, 'BDfnc', c.bgCyan + c.black)

/**
 * Обработка разных запросов к базе данных
 * @param {Object} req запрос
 * @param {Object} res ответ
 * @param {Object} BD указатель на базу данных
 * @param {string} mode режим (add, find)
 * @returns {Array.<Object>} Массив обработанных БД объектов
 */
async function BDRequest(req, res, BD, mode) {
    const FUNC_NAME = 'BDRequest'
    let message, colorMessage, logType, result, query
    try {
        log.verbs('--- Start func ' + c.cyan + FUNC_NAME)
        log.debug('req.body =\r\n', req.body)
        let data = req.body
        switch (mode) {
            case 'find':
                log.verbs(c.brightYellow + 'Enter "find" mode')
                if (req.params.id) {
                    log.debug('ID detected:', req.params.id)
                    data = { _id: req.params.id }
                }
                log.debug('Data for BD:', data)

                // result = await BD.find(data)
                query = BD.find(data)
                if (BD === Link) query = query.populate('tags')
                result = await query.exec()

                log.debug(
                    clc.bold('BD.find') +
                        ' returned: \r\n' +
                        c.brightBlue +
                        JSON.stringify(result, null, 2)
                )
                log.info(clc.bold('BD.find') + ` length = ${result.length}`)
                break
            case 'add':
                result = []
                // result = await BD.insertMany(data)
                log.verbs(c.brightYellow + 'Enter "add" mode')
                for (const doc of data) {
                    log.debug('New doc =', doc)
                    const a = await BD.create(doc)
                    result.push(a)
                    log.debug(clc.bold('BD.create \r\n') + c.brightBlue + a)
                }
                break
            default:
                break
        }
        message = result
        colorMessage = '--- OK from ' + c.cyan + FUNC_NAME
        log.silly('Message for return = \r\n', message)
        logType = 'verbs'
    } catch (err) {
        res.status(500)
        message = { message: err.message }
        colorMessage =
            c.brightRed +
            '--- ERROR from ' +
            clc.cyan(FUNC_NAME) +
            c.brightRed +
            '\r\n' +
            err.message
        logType = 'error'
    } finally {
        log[logType](colorMessage)
        res.json(message)
    }
}

/**
 * Поиск в базе данных методом find
 * @param {request} req
 * @param {response} res
 * @param {model} BD указатель на базу данных
 * @returns {Array.<Object>} Массив найденых объектов из БД
 */
async function findTagsByFilters(req, res, BD) {
    let message, colorMessage, logType
    try {
        log.verbs('--- Start func ' + c.cyan + 'findTagsByFilters')
        log.debug('Req.body (filter) =\r\n', req.body)

        let filter = req.body

        if (req.params.id) {
            log.debug('ID detected:', req.params.id)
            filter = { _id: req.params.id }
        }
        // filter = { 'title' : { '$regex' : 'Ph', '$options' : 'i' } }
        log.debug('filter:', filter)
        const result = await BD.find(filter)
        log.debug(
            clc.bold('BD.find') +
                ' returned: \r\n' +
                c.brightBlue +
                JSON.stringify(result, null, 2)
        )
        log.info(clc.bold('BD.find') + ` length = ${result.length}`)

        message = result
        colorMessage = '--- OK from ' + c.cyan + 'findTagsByFilters'
        logType = 'verbs'
    } catch (err) {
        res.status(500)
        message = { message: err.message }
        colorMessage = clc.redBright('--- ERROR\r\n' + err.message)
        logType = 'error'
    } finally {
        log[logType](colorMessage)
        res.json(message)
    }
}

async function createTags(req, res, BD) {
    let message, colorMessage, logType
    try {
        log.verbs('--- Start func ' + c.cyan + 'createTags')
        log.debug('Req.body (newTag) =\r\n', req.body)

        let newTags = req.body
        log.debug('newTags:', newTags)

        // const newDoc = await BD.create(newTag)
        const newDocs = await BD.insertMany(newTags)
        log.debug(
            clc.bold('BD.insertMany') +
                ' returned:\r\n' +
                c.brightBlue +
                JSON.stringify(newDocs, null, 2)
        )
        log.info(clc.bold('BD.insertMany') + ` length = ${newDocs.length}`)

        message = newDocs
        colorMessage = '--- OK from ' + c.cyan + 'createTags'
        logType = 'verbs'
    } catch (err) {
        res.status(500)
        message = { message: err.message }
        colorMessage = clc.redBright('--- ERROR\r\n' + err.message)
        logType = 'error'
    } finally {
        log[logType](colorMessage)
        res.json(message)
    }
}

// exports.findTagsByFilters = findTagsByFilters
// exports.createTags = createTags
exports.BDRequest = BDRequest
