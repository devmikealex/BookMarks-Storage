import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import WebLogger from 'mylogger/web-version'
const log = new WebLogger(null, 'TAGS', 'blue')

export default function Tags() {
    log.verbs('--- Start function Tags')

    const [error, setError] = useState(null)
    log.debug('Start error =', error)
    const [tags, setTags] = useState(null)
    log.debug('Start tags =', tags)

    const { id } = useParams()
    log.debug('id =', id)

    useEffect(() => {
        log.verbs('Enter to useEffect[]')
        const url = `${process.env.REACT_APP_SERVER}/tags/${id ?? ''}`
        log.debug('URL for fetch =', url)
        let errorFetch = false
        fetch(url)
            .then((response) => {
                log.http('fetch status: ' + response.status)
                log.http('fetch ok: ' + response.ok)
                errorFetch = !response.ok
                return response.json()
            })
            .then((tagsArr) => {
                log.debug('Response.json =', tagsArr)
                if (errorFetch) {
                    setError(tagsArr)
                    setTags(null)
                } else {
                    setError(null)
                    setTags(tagsArr)
                }
            })
            .catch((err) => {
                log.error('Catch ERROR', err)
                setError(err)
            })
    }, [id])
    log.verbs('--- Start Render Tags')

    return (
        <>
            <h1>Tags List</h1>
            {id && <p>ID={id}</p>}
            {tags && (
                <div>
                    Tags title:
                    {tags.map((item) => {
                        return <div key={item._id}>{item.title}</div>
                    })}
                </div>
            )}
            {error && <p>Error: {error.message}</p>}
        </>
    )
}
