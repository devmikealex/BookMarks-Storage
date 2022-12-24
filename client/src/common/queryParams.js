import WebLogger from 'mylogger/web-version'
const log = new WebLogger(null, 'queryParams', 'blue')

export default function queryParams(params, defaultParams = {}) {
    log.verbs('--- Start function -queryParams-')

    let paramsToServer = []

    const limit = params.get('limit')
    log.debug('Params limit =', limit)
    if (limit) paramsToServer.push('limit=' + limit)
    else if (defaultParams.limit) paramsToServer.push('limit=' + defaultParams.limit)

    const sfield = params.get('sfield')
    log.debug('Params sfield =', sfield)
    if (sfield) paramsToServer.push('sfield=' + sfield)
    else if (defaultParams.sfield) paramsToServer.push('sfield=' + defaultParams.sfield)

    const sorder = params.get('sorder')
    log.debug('Params sorder =', sorder)
    if (sorder) paramsToServer.push('sorder=' + sorder)
    else if (defaultParams.sorder) paramsToServer.push('sorder=' + defaultParams.sorder)

    let searchParams = ''
    if (paramsToServer.length) searchParams = '?' + paramsToServer.join('&')
    log.debug('New searchParams =', searchParams)

    return searchParams
}
