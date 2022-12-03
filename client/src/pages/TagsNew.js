import WebLogger from 'mylogger/web-version'
import { useState } from 'react'
const log = new WebLogger(null, 'TgsNW', 'green')

export default function TagsNew() {
    log.verbs('--- Start function TagsNew')

    const [error, setError] = useState({})
    log.debug('Start error =', error)
    const [newTag, setNewTag] = useState({})
    log.debug('Start tags =', newTag)

    log.verbs('--- Start Render TagsNew')

    return (
        <>
            <h1>Tags Create New</h1>
            <input type='text' id='asd' placeholder='title' />
            <input type='button' value='Add' onClick={Send} />
            <p>New Tag: {JSON.stringify(newTag)}</p>
            <p>Error: {error.message}</p>
        </>
    )

    async function Send() {
        log.verbs('--- Start function Send')

        const url = `${process.env.REACT_APP_SERVER}/tags`
        log.debug('URL for fetch =', url)
        let errorFetch = false

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            // Todo ----------
            body: JSON.stringify([{ title: document.querySelector('#asd').value }]),
        })
        log.http('fetch status: ' + response.status)
        log.http('fetch ok: ' + response.ok)
        errorFetch = !response.ok
        let resultJSON = await response.json()
        log.debug('Response.json =', resultJSON)
        if (errorFetch) {
            setError(resultJSON)
            setNewTag({})
        } else {
            setError({})
            setNewTag(resultJSON)
        }

        log.verbs('--- Exit function Send')
    }
}
