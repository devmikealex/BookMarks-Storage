import { useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import EditButton from '../components/EditButton'

import { myFetch_new } from '../common/fetch'
import Tag from '../components/Tag'
import TagsNew from './TagsNew'
import { Box, Button, Paper, Snackbar, Typography } from '@mui/material'

import WebLogger from 'mylogger/web-version'
import AlertInfo from '../components/AlertInfo'
import queryParams from '../common/queryParams'
const log = new WebLogger(null, 'TAGS', 'blue')

export default function Tags(props) {
    log.verbs('--- Start function Tags')

    const [snackbar, setSnackbar] = useState({ message: '', open: false })

    const [params, setParams] = useSearchParams({})
    log.debug('Params =', params)
    const defaultParams = { sfield: 'title', sorder: 1 }
    const searchParams = queryParams(params, defaultParams)

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

    const [filter, setFilter] = useState('')
    log.silly('Start filter =', filter)

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
        // myFetch_new(null, 'tags?sfield=title&sorder=1', 'GET').then((result) => {
        myFetch_new(null, 'tags' + searchParams, 'GET').then((result) => {
            log.debug('myFetch result', result)
            setErrorResult(result)
        })
    }, [id, forceRerender, params])
    log.verbs('--- Start Render Tags')

    //TODO пометить существующие теги для редактирования props.currentTags 'тег1, тег2, тег3'

    // TODO что то сделать с setSnackbar

    return (
        <Paper variant='outlined' sx={{ p: 2 }}>
            {deletable && (
                <Typography variant='h4' sx={{ mb: 1 }}>
                    Total tags: {tags?.length}
                </Typography>
            )}
            <TagsNew
                setForceRerender={setForceRerender}
                setFilter={setFilter}
                wrapper={wrapper}
                buttonType={props.buttonType}
                setTagsValue={props.setTagsValue}
                // currentTags={props.tagsValue}
            />
            {/* {id && <p>ID={id}</p>} */}
            {tags && (
                <Box sx={{ flexDirection: 'row', pt: 2 }}>
                    {tags.map((item) => {
                        if (!item.title.toLowerCase().includes(filter.toLowerCase()))
                            return null
                        // console.log(props?.currentTags)
                        // console.log(props?.currentTags?.includes(item.title))
                        // console.log(!!props?.currentTags.includes(item.title))
                        const chosen = !!props?.currentTags?.includes(item.title)
                        return (
                            <span
                                key={item._id}
                                style={{
                                    display: 'inline-block',
                                    // background: 'green',
                                    // borderRadius: '20px',
                                }}
                            >
                                <Tag
                                    item={item}
                                    // key={item._id}
                                    setTagsValue={props.setTagsValue}
                                    deletable={deletable}
                                    chosen={chosen}
                                    setForceRerender={setForceRerender}
                                    setSnackbar={setSnackbar}
                                />
                                {deletable && (
                                    <EditButton tag item={item} sx={{ p: 0, top: -1 }} />
                                )}
                            </span>
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
