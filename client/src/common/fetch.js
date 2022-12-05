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

    try {
        let response = await fetch(url, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(obj),
        })
        log.http('fetch status: ' + response.status)
        log.http('fetch ok: ' + response.ok)
        errorFetch = !response.ok
        resultJSON = await response.json()
        log.debug('Response.json =', resultJSON)
    } catch (error) {
        log.error(error)
        resultJSON = error.message
    }

    if (errorFetch) {
        // setError(resultJSON)
        // setNewTag(null)
    } else {
        // setError(null)
        // setNewTag(resultJSON)
    }

    log.verbs('--- Exit function -myFetch-')
    return { errorFetch, resultJSON }
}
