import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'

import WebLogger from 'mylogger/web-version'
import { myFetch_new } from '../common/fetch'
import Link from '../components/Link'
import Context from '../common/context'
import Tag from '../components/Tag'
import { Typography } from '@mui/material'
import EditButton from '../components/EditButton'
import queryParams from '../common/queryParams'
const log = new WebLogger(null, 'LINKS', 'green')

export default function Links() {
    log.verbs('--- Start function -Links-')

    const { toLog } = useContext(Context)

    const locat = useLocation()
    log.debug('Location.state =', locat.state)

    const [forceRerender, setForceRerender] = useState(true)

    const [params, setParams] = useSearchParams({})
    const currentTag = params.get('tag')
    log.debug('Params tag =', currentTag)

    // let paramsToServer = []
    // const limit = params.get('limit')
    // log.debug('Params limit =', limit)
    // if (limit) paramsToServer.push('limit=' + limit)
    // const sortField = params.get('sfield')
    // log.debug('Params sortField (sfield) =', sortField)
    // if (sortField) paramsToServer.push('sfield=' + sortField)
    // const sortOrder = params.get('sorder')
    // log.debug('Params sortOrder (sorder) =', sortOrder)
    // if (sortOrder) paramsToServer.push('sorder=' + sortOrder)
    // let searchParams = ''
    // if (paramsToServer.length) searchParams = '?' + paramsToServer.join('&')
    // log.debug('New searchParams =', searchParams)

    const searchParams = queryParams(params)

    const { id } = useParams()
    log.debug('id =', id)

    const tagObj = useRef({})

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
                    tagObj.current = locat.state
                    locat.state = null
                    log.debug('Set tagID from locat.state', tagID)
                } else {
                    tagObj.current = await getTagbyID(currentTag)
                    tagID = tagObj.current._id
                    log.debug('Set tagID from tagObj.current', tagID)
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
    }, [id, currentTag, searchParams, forceRerender])
    log.verbs('--- Start Render -Links-')
    //TODO может сюда добавить кнпоку удаления и редактирования названия тега
    return (
        <>
            <Typography variant='h4'>
                Links List {links?.length}{' '}
                {currentTag && <Tag item={{ title: currentTag }}></Tag>}
                {currentTag && (
                    <EditButton tag item={tagObj.current} sx={{ left: -5, top: 0 }} />
                )}
                {currentTag && tagObj.current.counter}
            </Typography>
            {currentTag && tagObj.current._id}
            {id && <p>ID={id}</p>}
            {links && (
                <>
                    {links.map((item) => {
                        return (
                            <Link
                                item={item}
                                key={item._id}
                                setForceRerender={setForceRerender}
                            />
                        )
                    })}
                </>
            )}
            {error && <p>Error: {error}</p>}
        </>
    )
}

async function getTagbyID(tagName) {
    log.verbs('--- Start function -getTagbyID-')
    const res = await myFetch_new({ title: tagName }, 'tags/filters', 'POST')
    log.debug('---------myFetch result', res)
    // const tagID = res.json[0]._id
    // log.debug('tagID =', tagID)
    // toLog(res.error)
    log.verbs('--- Exit function -getTagbyID-')
    return res.json[0]
}
