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
        e.stopPropagation()
        const a = document.getElementById('inp-tags')
        if (a) {
            let newValue = a.value
            const newTag = e.target.textContent
            let arr = newValue.split(', ')
            console.log('🚀 ~ file: Tag.js:27 ~ handleClick ~ arr', arr)
            if (newValue.includes(newTag)) {
                setChosen(false)
                const index = arr.indexOf(newTag)
                if (index > -1) {
                    arr.splice(index, 1)
                }
            } else {
                setChosen(true)
                // if (!arr[0] && !arr.length) arr = []
                // удаление пустых строк "" из массива
                arr = arr.filter((n) => n.trim())
                arr.push(newTag)
                console.log('🚀 ~ file: Tag.js:39 ~ handleClick ~ arr', arr)
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

    const label = props.item.title + (props.deletable ? ' - ' + props.item.counter : '')

    return (
        <Chip
            // label={`${props.item.title} (${props.deletable ? props.item.counter : ''})`}
            label={label}
            // color='success'
            color={chosen ? 'default' : 'success'}
            // variant={chosen ? 'outlined' : 'filled'}
            variant='filled'
            sx={{ m: 0.4 }}
            onClick={handleClick}
            onDelete={props.deletable ? () => handleAlertDelete(props.item) : null}
        />
    )
}
