import { IconButton, Paper, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import WebLogger from 'mylogger/web-version'
import myFetch, { myFetch_new } from '../common/fetch'

import './Link.css'
import { Box } from '@mui/system'
import Ahref from '@mui/material/Link'

import { Link as RRLink, useNavigate } from 'react-router-dom'
import Tag from './Tag'
import CopyButton from './CopyButton'
import EditButton from './EditButton'
import ImagePreview from './ImagePreview'
import { useContext, useState } from 'react'
import Context from '../common/context'
import DateComp from './Date'

const PATH_TO_PREVIEW = process.env.REACT_APP_SERVER + '/static/images/'

const log = new WebLogger(null, 'LINK', 'red')

export default function Link(props) {
    // const {} = props

    const navigate = useNavigate()

    //TODO общая функция с Link
    async function incrementCounter(id) {
        log.verbs('--- Start function -incrementCounter-')
        log.debug('id:', id)
        const res = await myFetch(null, 'links/countinc/' + id, 'GET')
        // log.debug('---------myFetch result', res)
        const { resultJSON } = res
        log.silly('New clicks', resultJSON.clicks)
    }
    function LinkWithCount(props) {
        return (
            <Ahref
                href={props.item.url}
                underline='hover'
                color={props.color}
                onClick={() => incrementCounter(props.item._id)}
                onAuxClick={() => incrementCounter(props.item._id)}
                target='_blank'
                rel='noopener noreferrer'
            >
                {props.children}
            </Ahref>
        )
    }

    return (
        // <Paper variant='outlined' sx={{ m: 2, boxShadow: 3 }}>
        <Box sx={{ p: 0 }}>
            <Ahref to={'/links/' + props.item._id} underline='hover' component={RRLink}>
                <Typography component='span'>{props.item.title}</Typography>
            </Ahref>
            <br />
            <Box>
                {props.item.tags.map((item) => {
                    return <Tag item={item} key={item._id} />
                })}
            </Box>
        </Box>
        // </Paper>
    )
}
