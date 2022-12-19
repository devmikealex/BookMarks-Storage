import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import EditButton from '../components/EditButton'

import { myFetch_new } from '../common/fetch'
import Tag from '../components/Tag'
import TagsNew from './TagsNew'
import { Box, Button, Paper, Snackbar } from '@mui/material'

import WebLogger from 'mylogger/web-version'
import AlertInfo from '../components/AlertInfo'
const log = new WebLogger(null, 'TAGS', 'blue')

export default function Tags(props) {
    log.verbs('--- Start function Tags')

    const [snackbar, setSnackbar] = useState({ message: '', open: false })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSnackbar('', false)
    }

    const [forceRerender, setForceRerender] = useState(true)
    log.silly('Start forceRerender =', forceRerender)

    const [errorResult, setErrorResult] = useState({ error: null, json: null })
    log.debug('Start errorResult =', errorResult)
    const tags = errorResult.json

    // const [error, setError] = useState(null)
    // log.debug('Start error =', error)
    // const [tags, setTags] = useState(null)
    // log.debug('Start tags =', tags)

    const { id } = useParams()
    log.debug('id =', id)

    const deletable = props.deletable ?? false

    log.debug('props.wrapper =', props.wrapper)
    const wrapper = props.wrapper ?? false
    log.debug('wrapper =', wrapper)

    useEffect(() => {
        log.verbs('Enter to useEffect[]')
        myFetch_new(null, 'tags' + '?sfield=title&sorder=1&limit=0', 'GET').then(
            (result) => {
                log.debug('myFetch result', result)
                setErrorResult(result)
            }
        )
    }, [id, forceRerender])
    log.verbs('--- Start Render Tags')

    //TODO пометить существующие теги для редактирования props.currentTags 'тег1, тег2, тег3'

    // TODO что то сделать с setSnackbar

    return (
        <Paper variant='outlined' sx={{ p: 2 }}>
            <TagsNew
                setForceRerender={setForceRerender}
                wrapper={wrapper}
                buttonType={props.buttonType}
            />
            {/* {id && <p>ID={id}</p>} */}
            {tags && (
                <Box sx={{ flexDirection: 'row', pt: 2 }}>
                    {tags.map((item) => {
                        // console.log(props?.currentTags)
                        // console.log(props?.currentTags?.includes(item.title))
                        // console.log(!!props?.currentTags.includes(item.title))
                        const chosen = !!props?.currentTags?.includes(item.title)
                        return (
                            <>
                                <Tag
                                    item={item}
                                    key={item._id}
                                    setTagsValue={props.setTagsValue}
                                    deletable={deletable}
                                    chosen={chosen}
                                    setForceRerender={setForceRerender}
                                    setSnackbar={setSnackbar}
                                />
                                {deletable && (
                                    <EditButton tag item={item} sx={{ p: 0, top: -1 }} />
                                )}
                            </>
                        )
                    })}
                </Box>
            )}
            {/* {error && <p>Error: {error.message}</p>} */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackbar.message}
            />
        </Paper>
    )
}
