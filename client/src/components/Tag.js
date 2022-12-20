import { Chip } from '@mui/material'
import './Tag.css'

import { myFetch_new } from '../common/fetch'

import WebLogger from 'mylogger/web-version'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../common/context'
const log = new WebLogger('error', 'TAG', 'white-Chocolate')

export default function Tag(props) {
    const { toModalAlert } = useContext(Context)

    const navigate = useNavigate()

    const [chosen, setChosen] = useState(props.chosen)
    log.debug('Start chosen =', chosen)

    function handleClick(e) {
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
            navigate('/links?tag=' + e.target.textContent, { state: props.item })
        }
    }

    function handleAlertDelete(item) {
        log.verbs('--- Start function -handleAlertDelete-')
        toModalAlert(
            `Delete tag "${item.title}"?`,
            `Confirm removal of tag with ID ${item._id}`,
            'Delete',
            handleDelete,
            item._id
        )
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

    return (
        <Chip
            label={props.item.title}
            color='success'
            variant={chosen ? 'outlined' : 'filled'}
            sx={{ m: 0.4 }}
            onClick={handleClick}
            onDelete={props.deletable ? () => handleAlertDelete(props.item) : null}
        />
    )
}
