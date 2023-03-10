const serialize = require('serialize-javascript')
const clc = require('cli-color')

const c = require('mylogger/colors')
const Logger = require('mylogger')
const Link = require('../models/Link')
const log = new Logger('silly', 'BDfnc', c.bgCyan + c.black)

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

                // query = BD.find(data)
                // if (BD === Link) query = query.populate('tags')
                // result = await query.exec()
                // if (typeof data === 'string' || data instanceof String)
                if (data.hasOwnProperty('objSer')) {
                    log.debug(c.brightYellow + 'Deserialize data')
                    data = deserialize(data.objSer)
                }
                if (!Array.isArray(data)) {
                    log.debug(c.brightYellow + 'Convert data to array [data]')
                    data = [data]
                }

                log.debug(c.brightCyan + 'Data for BD final', data)

                query = BD.find(...data)
                //TODO получить инфу через params......
                const limit = req.query.limit ?? 0
                log.debug('limit:', limit)
                query = query.limit(limit)

                const sortField = req.query.sfield ?? 'mod_date'
                const sortOrder = req.query.sorder ?? -1
                query = query.sort({ [sortField]: sortOrder })
                log.debug('sortField:', sortField, '- sortOrder:', sortOrder)

                if (BD === Link) query = query.populate('tags')
                result = await query.exec()

                // log.debug(
                //     clc.bold('BD.find') +
                //         ' returned: \r\n' +
                //         c.brightBlue +
                //         JSON.stringify(result, null, 2)
                // )
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
            case 'delete':
                log.verbs(c.brightYellow + 'Enter "delete" mode')
                result = await BD.deleteOne(data)
                log.debug(
                    clc.bold('BD.delete \r\n') +
                        c.brightBlue +
                        JSON.stringify(result, null, 2)
                )
                break
            case 'patch':
                log.verbs(c.brightYellow + 'Enter "patch" mode')
                const update = data[0]
                const filter = { _id: update._id }
                delete update._id
                log.debug('filter', c.brightWhite, filter)
                log.debug('update', c.brightCyan, update)
                result = await BD.findByIdAndUpdate(filter, update)
                log.debug(
                    clc.bold('BD.patch \r\n') +
                        c.brightBlue +
                        JSON.stringify(result, null, 2)
                )
                break
            case 'search':
                log.verbs(c.brightYellow + 'Enter "search" mode')
                log.debug('Data for BD:', data)
                // log.error('- - - NOT IMPLEMENTED - - -')
                throw new Error('NOT IMPLEMENTED')
                break
            default:
                break
        }
        message = result
        colorMessage = '--- OK from ' + c.cyan + FUNC_NAME
        //TODO пофиксить вывод объектов - tags: [ [Object], [Object], [Object] ]
        // log.silly('Message for return = \r\n', message)
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

function deserialize(serializedJavascript) {
    log.verbs('--- Start func ' + c.cyan + 'deserialize')
    const res = eval('(' + serializedJavascript + ')')
    log.verbs('Return =', res)
    return res
}
