import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

import WebLogger from 'mylogger/web-version'
import { myFetch_new } from '../common/fetch'
import Link from '../components/Link'
import Context from '../common/context'
import Tag from '../components/Tag'
import { Typography } from '@mui/material'
const log = new WebLogger(null, 'LINKS', 'green')

export default function Links() {
    log.verbs('--- Start function -Links-')

    const { toLog } = useContext(Context)

    const locat = useLocation()
    log.debug('Location.state =', locat.state)

    const [params, setParams] = useSearchParams({})
    const currentTag = params.get('tag')
    log.debug('Params tag =', currentTag)

    let paramsToServer = []
    const limit = params.get('limit')
    log.debug('Params limit =', limit)
    if (limit) paramsToServer.push('limit=' + limit)
    const sortField = params.get('sfield')
    log.debug('Params sortField (sfield) =', sortField)
    if (sortField) paramsToServer.push('sfield=' + sortField)
    const sortOrder = params.get('sorder')
    log.debug('Params sortOrder (sorder) =', sortOrder)
    if (sortOrder) paramsToServer.push('sorder=' + sortOrder)
    let searchParams = ''
    if (paramsToServer.length) searchParams = '?' + paramsToServer.join('&')
    log.debug('New searchParams =', searchParams)

    const { id } = useParams()
    log.debug('id =', id)

    const [errorResult, setErrorResult] = useState({ error: null, json: null })
    log.debug('Start errorResult =', errorResult)
    // const links = errorResult.json
    // const error = errorResult.error
    const { error, json: links } = errorResult

    useEffect(() => {
        log.verbs('Enter to useEffect[id, currentTag, searchParams]')

        async function ttt() {
            let obj = {},
                metod = 'GET',
                url = 'links/' + (id ?? ''),
                tagID
            if (currentTag) {
                url = 'links/filters/'
                metod = 'POST'
                if (locat.state) {
                    tagID = locat.state._id
                } else {
                    tagID = await getTagIDforName(currentTag)
                }
                obj = { tags: tagID }
            }
            // myFetch_new(obj, url, metod).then((result) => {
            // 	log.debug('myFetch result', result)
            // 	setErrorResult(result)
            // 	toLog(result.error)
            // })
            const result = await myFetch_new(obj, url + searchParams, metod)
            log.debug('myFetch result', result)
            toLog(result.error)
            setErrorResult(result)
        }
        ttt()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, currentTag, searchParams])
    log.verbs('--- Start Render -Links-')
    //TODO может сюда добавить кнпоку удаления и редактирования названия тега
    return (
        <>
            <Typography variant='h4'>
                Links List {links?.length}{' '}
                {currentTag && <Tag item={{ title: currentTag }}></Tag>}
            </Typography>
            {id && <p>ID={id}</p>}
            {links && (
                <>
                    {links.map((item) => {
                        return <Link item={item} key={item._id} />
                    })}
                </>
            )}
            {error && <p>Error: {error}</p>}
        </>
    )
}

async function getTagIDforName(tagName) {
    log.verbs('--- Start function -getTagIDforName-')
    const res = await myFetch_new({ title: tagName }, 'tags/filters', 'POST')
    log.debug('---------myFetch result', res)
    const tagID = res.json[0]._id
    log.debug('tagID =', tagID)
    // toLog(res.error)
    log.verbs('--- Exit function -getTagIDforName-')
    return tagID
}
