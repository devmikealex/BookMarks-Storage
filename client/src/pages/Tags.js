import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import myFetch from '../common/fetch'
import Tag from '../components/Tag'
import TagsNew from './TagsNew'
import { Box } from '@mui/material'

import WebLogger from 'mylogger/web-version'
const log = new WebLogger(null, 'TAGS', 'blue')

export default function Tags(props) {
    log.verbs('--- Start function Tags')

    const [forceRerender, setForceRerender] = useState(true)
    log.silly('Start forceRerender =', forceRerender)

    const [error, setError] = useState(null)
    log.debug('Start error =', error)
    const [tags, setTags] = useState(null)
    log.debug('Start tags =', tags)

    const { id } = useParams()
    log.debug('id =', id)

    const deletable = props.deletable ?? false

    useEffect(() => {
        log.verbs('Enter to useEffect[]')
        myFetch(null, 'tags', 'GET').then((result) => {
            log.debug('myFetch result', result)
            const { errorFetch, resultJSON } = result
            if (errorFetch) {
                setError(resultJSON)
                setTags(null)
            } else {
                setError(null)
                setTags(resultJSON)
            }
        })
    }, [id, forceRerender])
    log.verbs('--- Start Render Tags')

    return (
        <>
            {id && <p>ID={id}</p>}
            {tags && (
                <Box sx={{ flexDirection: 'row' }}>
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

            {error && <p>Error: {error.message}</p>}
            <TagsNew setForceRerender={setForceRerender} />
        </>
    )
}
