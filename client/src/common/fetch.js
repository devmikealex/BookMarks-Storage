import WebLogger from 'mylogger/web-version'
const log = new WebLogger(null, 'myFetch', 'orange')

/**
 * Отправить запрос к БД на сервер
 * @param {Array<Objects>} obj Массив объектов для манипулирования БД
 * @param {string} path Пусть на сервере (links)
 * @param {string} method Метод запроса (GET)
 * @returns
 */
export default async function myFetch(obj, path = 'links', method = 'GET') {
    log.verbs('--- Start function -myFetch-')

    const url = `${process.env.REACT_APP_SERVER}/${path}`
    log.debug(`URL for fetch ${method} = ${url}`)
    log.debug('Object for fetch', obj)

    let errorFetch = false,
        resultJSON

    let body
    if (method === 'GET') body = null
    else body = JSON.stringify(obj)

    try {
        let response = await fetch(url, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
            body,
        })
        log.http('fetch status: ' + response.status)
        log.http('fetch statusText: ' + response.statusText)
        log.http('fetch ok: ' + response.ok)
        errorFetch = !response.ok
        resultJSON = await response.json()
        log.debug('Response.json =', resultJSON)
    } catch (error) {
        errorFetch = true
        log.error('fetch return error:', error)
        resultJSON = error
    }
    // if (errorFetch) {
    // } else {
    // }
    log.verbs('--- Exit function -myFetch-')
    return { errorFetch, resultJSON }
}

export async function myFetch_new(obj, path = 'links', method = 'GET') {
    log.verbs('--- Start function -myFetch_new-')

    const url = `${process.env.REACT_APP_SERVER}/${path}`
    log.debug(`URL for fetch ${method} ${url}`)
    log.debug('Object for fetch', obj)

    let errorFetch = false,
        resultJSON,
        statusText

    let body
    if (method === 'GET') body = null
    else body = JSON.stringify(obj)

    try {
        let response = await fetch(url, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
            body,
        })
        log.http('fetch status: ' + response.status)
        statusText = response.statusText
        log.http('fetch statusText: ' + statusText)
        log.http('fetch ok: ' + response.ok)
        errorFetch = !response.ok
        if (errorFetch) {
            const err = await response.json()
            resultJSON = statusText + ' / ' + err.message
        } else {
            resultJSON = await response.json()
        }
        log.debug('Response.json =', resultJSON)
    } catch (error) {
        errorFetch = true
        log.error('fetch return error:', error)
        resultJSON = statusText + ' / ' + error.message
    }

    let result
    if (errorFetch) {
        result = { error: resultJSON, json: null }
    } else {
        result = { error: null, json: resultJSON }
    }

    log.debug('Return =', result)
    log.verbs('--- Exit function -myFetch_new-')
    return result
}
