import { Chip } from '@mui/material'
import './Tag.css'

import { myFetch_new } from '../common/fetch'

import WebLogger from 'mylogger/web-version'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const log = new WebLogger('error', 'TAG', 'white-Chocolate')

export default function Tag(props) {
    // const {} = props
    // const [errorResult, setErrorResult] = useState({ error: null, json: null })

    const navigate = useNavigate()

    const [chosen, setChosen] = useState(false)
    log.debug('Start chosen =', chosen)
    // const [error, setError] = useState(null)
    // log.debug('Start error =', error)
    // todo naming
    // const [newLinks, setNewLinks] = useState(null)
    // log.debug('Start newLinks =', newLinks)

    function handleClick(e) {
        // e.preventDefault()
        // const a = document.getElementById('inp-tags')
        // if (a.value === '') a.value = e.target.textContent
        // else a.value += ', ' + e.target.textContent
        const a = document.getElementById('inp-tags')
        if (a) {
            let newValue = a.value
            const newTag = e.target.textContent
            let arr = newValue.split(', ')
            if (newValue.includes(newTag)) {
                setChosen(false)
                const index = arr.indexOf(newTag)
                if (index > -1) {
                    arr.splice(index, 1)
                }
            } else {
                setChosen(true)
                if (!arr[0]) arr = []
                arr.push(newTag)
            }
            newValue = arr.join(', ')
            props.setTagsValue(newValue)
        } else {
            // goto links/filters/ POST with props.item._id in tags array
            // http://localhost:3018/links/tag/636fba92ba9e176e0e2f9fad
            console.log(`goto filter - ${e.target.textContent} - ${props.item._id}`)
            // redirect('/links/tag/' + props.item._id)

            navigate('/links?tag=' + e.target.textContent, { state: props.item })
            // navigate('/links?tag=' + props.item._id)
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
            // clickable={!chosen}
            sx={{ m: 0.4 }}
            onClick={handleClick}
            onDelete={props.deletable ? () => handleDelete(props.item._id) : null}
        />
    )
}
