import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { myFetch_new } from '../common/fetch'
import Tag from '../components/Tag'
import TagsNew from './TagsNew'
import { Box, Paper } from '@mui/material'

import WebLogger from 'mylogger/web-version'
const log = new WebLogger(null, 'TAGS', 'blue')

export default function Tags(props) {
    log.verbs('--- Start function Tags')

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
        myFetch_new(null, 'tags', 'GET').then((result) => {
            log.debug('myFetch result', result)
            setErrorResult(result)
        })
    }, [id, forceRerender])
    log.verbs('--- Start Render Tags')

    return (
        <Paper variant='outlined' sx={{ p: 2 }}>
            <TagsNew setForceRerender={setForceRerender} wrapper={wrapper} />
            {id && <p>ID={id}</p>}
            {tags && (
                <Box sx={{ flexDirection: 'row', pt: 2 }}>
                    {tags.map((item) => {
                        return (
                            <Tag
                                item={item}
                                key={item._id}
                                setTagsValue={props.setTagsValue}
                                deletable={deletable}
                                setForceRerender={setForceRerender}
                            />
                        )
                    })}
                </Box>
            )}
            {/* {error && <p>Error: {error.message}</p>} */}
        </Paper>
    )
}
