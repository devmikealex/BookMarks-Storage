import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

import WebLogger from 'mylogger/web-version'
import { myFetch_new } from '../common/fetch'
import Link from '../components/Link'
import Context from '../common/context'
const log = new WebLogger(null, 'LINKS', 'green')

export default function Links() {
    log.verbs('--- Start function -Links-')

    const { toLog } = useContext(Context)

    const [errorResult, setErrorResult] = useState({ error: null, json: null })
    log.debug('Start errorResult =', errorResult)
    const links = errorResult.json
    const error = errorResult.error

    const { id } = useParams()
    log.debug('id =', id)

    useEffect(() => {
        log.verbs('Enter to useEffect[id]')

        myFetch_new(null, 'links/' + (id ?? ''), 'GET').then((result) => {
            log.debug('myFetch result', result)
            setErrorResult(result)
            toLog(result.error)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
