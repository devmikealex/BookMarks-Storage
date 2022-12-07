import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import WebLogger from 'mylogger/web-version'
import myFetch from '../common/fetch'
import Tag from '../components/Tag'
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
        myFetch(null, 'tags', 'GET').then((result) => {
            log.debug('myFetch result', result)
            const { errorFetch, resultJSON } = result
            if (errorFetch) {
                setError(resultJSON)
                setTags(null)
            } else {
                setError(null)
                setTags(resultJSON)
            }
        })
    }, [id])
    log.verbs('--- Start Render Tags')

    return (
        <>
            <h1>Tags List</h1>
            {id && <p>ID={id}</p>}
            {tags && (
                <div>
                    {tags.map((item) => {
                        return <Tag item={item} key={item._id} />
                    })}
                </div>
            )}
            {error && <p>Error: {error.message}</p>}
        </>
    )
}
