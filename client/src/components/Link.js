import { Paper, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'

import WebLogger from 'mylogger/web-version'
import myFetch from '../common/fetch'

import './Link.css'
import { Box } from '@mui/system'
import Ahref from '@mui/material/Link'

import { Link as RRLink } from 'react-router-dom'
import Tag from './Tag'
import CopyButton from './CopyButton'
import EditButton from './EditButton'
import ImagePreview from './ImagePreview'

const PATH_TO_PREVIEW = process.env.REACT_APP_SERVER + '/static/images/'

const log = new WebLogger(null, 'LINK', 'red')

export default function Link(props) {
    // const {} = props

    async function incrementCounter(id) {
        log.verbs('--- Start function -incrementCounter-')
        log.debug('id:', id)
        const res = await myFetch(null, 'links/countinc/' + id, 'GET')
        // log.debug('---------myFetch result', res)
        const { resultJSON } = res
        log.silly('New clicks', resultJSON.clicks)
    }

    // function incrementCounter_old(id) {
    //     log.verbs('--- Start function -incrementCounter-')
    //     log.debug('id:', id)
    //     fetch(process.env.REACT_APP_SERVER + '/links/countinc/' + id)
    //         .then((response) => response.json())
    //         .then((result) => log.debug('incrementCounter fetch return:', result.clicks))
    // }

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
                <CopyButton />
                <EditButton item={props.item} />
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
                {props.item.crt_date} --- {props.item.mod_date}
                <Typography>{props.item.description}</Typography>
                {props.item.images.map(
                    (item) => (
                        <ImagePreview image={item} key={item} />
                    )
                    // {
                    //     return (
                    //         <img
                    //             src={PATH_TO_PREVIEW + item}
                    //             width='300px'
                    //             height='200px'
                    //             alt='preview'
                    //             key={item}
                    //             style={{ objectFit: 'cover', marginRight: '4px' }}
                    //         />
                    //     )
                    // }
                )}
            </Box>
        </Paper>
    )
}
