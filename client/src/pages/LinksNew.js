import myFetch from '../common/fetch'
import WebLogger from 'mylogger/web-version'
import Links from './Links'
import Tags from './Tags'
import { useState } from 'react'
const log = new WebLogger(null, 'LinksNEW', 'magenta')

export default function LinksNew() {
    log.verbs('--- Start function -LinksNew-')

    const [error, setError] = useState(null)
    log.debug('Start error =', error)
    const [newLinks, setNewLinks] = useState(null)
    log.debug('Start newLinks =', newLinks)

    async function Send(e) {
        log.verbs('--- Start function -Send-')
        e.preventDefault()

        const res = await myFetch(null, 'tags', 'GET')
        log.debug('---------myFetch result', res)
        const { errorFetch, resultJSON: tags } = res
        if (errorFetch) {
            setError(tags)
            return
        } else {
            setError(null)
        }
        log.silly('tags', tags)

        const tagsName = e.target.tags.value.split(', ')
        log.debug('tagsName', tagsName)

        const tagsID = tagsName.map((item) => {
            const tag = tags.find((element) => element.title === item)
            return tag._id
        })
        log.debug('tagsID', tagsID)

        const newLink = {
            title: e.target.title.value,
            url: e.target.url.value,
            description: e.target.description.value,
            tags: tagsID,
            images: e.target.images.value.split(', '),
        }
        myFetch([newLink], 'links', 'POST').then((result) => {
            log.debug('myFetch result', result)
            const { errorFetch, resultJSON } = result
            if (errorFetch) {
                setError(resultJSON)
                setNewLinks(null)
            } else {
                setError(null)
                setNewLinks(resultJSON)
            }
        })
        log.verbs('--- Exit function -Send-')
    }
    log.verbs('--- Start Render -LinksNew-')
    return (
        <>
            <h1>Links NEW</h1>
            <h2>Add new link</h2>
            <form onSubmit={Send}>
                <label>
                    Title :
                    <input type='text' name='title' placeholder='title' />
                </label>
                <br />
                <label>
                    URL :
                    <input type='text' name='url' placeholder='url' />
                </label>
                <br />
                <label>
                    Description :
                    <input type='text' name='description' placeholder='description' />
                </label>
                <br />
                <label>
                    Tags :
                    <input id='tags' type='text' name='tags' placeholder='tags' />
                </label>
                <Tags />
                <br />
                <label>
                    Images :
                    <input type='text' name='images' placeholder='images' />
                </label>
                <br />
                <button>Send</button>
            </form>
            {newLinks && (
                <div>
                    New Links:
                    {newLinks.map((item) => {
                        return <div key={item._id}>{JSON.stringify(item)}</div>
                    })}
                </div>
            )}
            {error && <p>Error: {error.message}</p>}
            <Links key={Math.random()} />
        </>
    )
}
