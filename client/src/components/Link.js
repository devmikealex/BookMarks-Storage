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

    const { toModalAlert, toImagesModal } = useContext(Context)

    const navigate = useNavigate()

    async function incrementCounter(id) {
        log.verbs('--- Start function -incrementCounter-')
        log.debug('id:', id)
        const res = await myFetch(null, 'links/countinc/' + id, 'GET')
        // log.debug('---------myFetch result', res)
        const { resultJSON } = res
        log.silly('New clicks', resultJSON.clicks)
    }

    function handleImageModal(event, item) {
        log.verbs('--- Start function -handleImageModal-')
        // console.log('🚀 ~ file: Link.js:42 ~ handleImageModal ~ event', event)
        // console.log(event.target.alt)
        toImagesModal(item.title, item.images, event.target.alt)
    }

    function handleAlertDelete(item) {
        log.verbs('--- Start function -handleAlertDelete-')
        toModalAlert(
            `Delete link "${item.title}"?`,
            `Confirm removal of link with ID ${item._id}`,
            'Delete',
            handleDelete,
            item._id
        )
    }

    function handleDelete(id) {
        log.verbs('--- Start function -handleDelete-')
        log.debug('Tag ID for delete =', id)
        myFetch_new({ _id: id }, 'links', 'DELETE').then((result) => {
            log.debug('myFetch result', result)
            // navigate('/links/' + id)
            props.setForceRerender(id)
            // props.setSnackbar({ message: JSON.stringify(result.json), open: true })
        })
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
        <Paper variant='outlined' sx={{ m: 2, boxShadow: 3 }}>
            <Box sx={{ p: 3 }}>
                <LinkWithCount item={props.item} color='text.primary'>
                    <Typography variant='h5' component='span'>
                        {props.item.title}
                    </Typography>
                </LinkWithCount>
                {props.item.score && (
                    <Typography component='span' color='error'>
                        {' '}
                        ({props.item.score})
                    </Typography>
                )}
                <CopyButton />
                <EditButton item={props.item} />
                <IconButton
                    onClick={() => handleAlertDelete(props.item)}
                    aria-label='delete'
                    sx={{ top: '-4px', ...props.sx }}
                >
                    <DeleteForeverIcon fontSize='small' color='disabled' />
                </IconButton>
                <br />
                <LinkWithCount item={props.item}>{props.item.url}</LinkWithCount>
                <Typography variant='body2'>
                    <Ahref
                        to={'/links/' + props.item._id}
                        underline='hover'
                        component={RRLink}
                        color='lightgray'
                    >
                        {props.item._id}
                    </Ahref>
                </Typography>
                <Box>
                    {props.item.tags.map((item) => {
                        // return <Chip label={item.title} key={item._id} />
                        return <Tag item={item} key={item._id} />
                    })}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <VisibilityIcon color='success' fontSize='small' />
                    <Typography pl={0.5} variant='body2' color='success.main'>
                        Clicks: {props.item.clicks}
                    </Typography>
                </Box>
                <Typography>{props.item.description}</Typography>
                <DateComp item={props.item} />
                {props.item.images.map((item) => (
                    <ImagePreview
                        onClick={(e) => handleImageModal(e, props.item)}
                        image={item}
                        key={item}
                    />
                ))}
            </Box>
        </Paper>
    )
}
