import { Chip } from '@mui/material'
import './Tag.css'

import myFetch, { myFetch_new } from '../common/fetch'

import WebLogger from 'mylogger/web-version'
import { useState } from 'react'
const log = new WebLogger('error', 'TAG', 'white-Chocolate')

export default function Tag(props) {
    // const {} = props
    const [errorResult, setErrorResult] = useState({ error: null, json: null })

    const [chosen, setChosen] = useState(false)
    log.debug('Start chosen =', chosen)
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
            setChosen(true)
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
        myFetch_new({ _id: id }, 'tags', 'DELETE').then((result) => {
            log.debug('myFetch result', result)
            props.setForceRerender(id)
            props.setSnackbar({ message: JSON.stringify(result.json), open: true })
        })
    }

    // return <button onClick={handleClick}>{props.item.title}</button>
    return (
        <Chip
            label={props.item.title}
            color='success'
            variant={chosen ? 'outlined' : 'filled'}
            clickable={!chosen}
            sx={{ m: 0.4 }}
            onClick={handleClick}
            onDelete={props.deletable ? () => handleDelete(props.item._id) : null}
        />
    )
}
