const clc = require('cli-color');

const c = require('mylogger/colors')
const Logger = require('mylogger')
const log = new Logger(undefined, 'BDfnc', c.bgBrightMagenta + c.black)

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
        log.debug("filter:", filter)
        const result = await BD.find(filter)
        log.debug(clc.bold('BD.find') + ' returned: \r\n' + c.brightBlue + JSON.stringify(result, null, 2))
        log.info(clc.bold('BD.find') + ` length = ${result.length}`)

        message = result
        colorMessage = '--- OK from ' + c.cyan + 'findTagsByFilters'
        logType = 'verbs'
    } catch (err) {
        res.status(500);
        message = { message: err.message };
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
        log.debug("newTags:", newTags)

        // const newDoc = await BD.create(newTag)
        const newDocs = await BD.insertMany(newTags)
        log.debug(clc.bold('BD.insertMany') + ' returned:\r\n' + c.brightBlue + JSON.stringify(newDocs, null, 2))
        log.info(clc.bold('BD.insertMany') + ` length = ${newDocs.length}`)

        message = newDocs
        colorMessage = '--- OK from ' + c.cyan + 'createTags'
        logType = 'verbs'
    } catch (err) {
        res.status(500);
        message = { message: err.message };
        colorMessage = clc.redBright('--- ERROR\r\n' + err.message)
        logType = 'error'
    } finally {
        log[logType](colorMessage)
        res.json(message)
    }
}

exports.findTagsByFilters = findTagsByFilters
exports.createTags = createTags
