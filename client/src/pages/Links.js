import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import WebLogger from 'mylogger/web-version'
import { myFetch_new } from '../common/fetch'
import Link from '../components/Link'
const log = new WebLogger(null, 'LINKS', 'green')

export default function Links() {
    log.verbs('--- Start function -Links-')

    const [errorResult, setErrorResult] = useState({ error: null, json: null })
    log.debug('Start errorResult =', errorResult)
    const links = errorResult.json
    const error = errorResult.error

    const { id } = useParams()
    log.debug('id =', id)

    useEffect(() => {
        log.verbs('Enter to useEffect[]')

        myFetch_new(null, 'links/' + (id ?? ''), 'GET').then((result) => {
            log.debug('myFetch result', result)
            setErrorResult(result)
        })
    }, [id])
    log.verbs('--- Start Render -Links-')

    return (
        <>
            <h1>Links List</h1>
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
