import { Chip } from '@mui/material'
import './Tag.css'

import myFetch from '../common/fetch'

import WebLogger from 'mylogger/web-version'
import { useState } from 'react'
const log = new WebLogger(null, 'TAG', 'white-Chocolate')

export default function Tag(props) {
    // const {} = props
    const [error, setError] = useState(null)
    log.debug('Start error =', error)
    // todo naming
    const [newLinks, setNewLinks] = useState(null)
    log.debug('Start newLinks =', newLinks)

    function handleClick(e) {
        // e.preventDefault()
        // const a = document.getElementById('inp-tags')
        // if (a.value === '') a.value = e.target.textContent
        // else a.value += ', ' + e.target.textContent
        const a = document.getElementById('inp-tags')
        if (a) {
            let newValue = a.value
            const newTag = e.target.textContent
            if (!newValue.includes(newTag)) {
                if (newValue === '') newValue = newTag
                else newValue += ', ' + newTag
                console.log('newValue:', newValue)
                console.log('props:', props)
                props.setTagsValue(newValue)
            }
        }
    }

    function handleDelete(id) {
        log.verbs('--- Start function -handleDelete-')
        log.debug('Tag ID for delete =', id)
        myFetch({ _id: id }, 'tags', 'DELETE').then((result) => {
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
        props.setForceRerender(id)
    }

    // return <button onClick={handleClick}>{props.item.title}</button>
    return (
        <Chip
            label={props.item.title}
            color='success'
            sx={{ m: 0.4 }}
            onClick={handleClick}
            onDelete={props.deletable ? () => handleDelete(props.item._id) : false}
        />
    )
}
