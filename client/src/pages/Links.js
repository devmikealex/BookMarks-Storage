import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import WebLogger from 'mylogger/web-version'
import myFetch from '../common/fetch'
import Link from '../components/Link'
const log = new WebLogger(null, 'LINKS', 'green')

export default function Links() {
    log.verbs('--- Start function -Links-')

    const [error, setError] = useState(null)
    log.debug('Start error =', error)
    const [links, setLinks] = useState(null)
    log.debug('Start links =', links)

    const { id } = useParams()
    log.debug('id =', id)

    useEffect(() => {
        log.verbs('Enter to useEffect[]')
        myFetch(null, 'links', 'GET').then((result) => {
            log.debug('myFetch result', result)
            const { errorFetch, resultJSON } = result
            if (errorFetch) {
                setError(resultJSON)
                setLinks(null)
            } else {
                setError(null)
                setLinks(resultJSON)
            }
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
            {error && <p>Error: {error.message}</p>}
        </>
    )
}
