import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

import { myFetch_new } from '../common/fetch'
import WebLogger from 'mylogger/web-version'
import { useContext, useState } from 'react'

import Context from '../common/context'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import Ahref from '@mui/material/Link'
import { Link as RRLink } from 'react-router-dom'

const log = new WebLogger(null, 'TagsEdit', 'DarkViolet')

export default function TagsEdit() {
    log.verbs('--- Start function -TagsEdit-')

    // const { item } = props

    const navigate = useNavigate()

    const { toLog } = useContext(Context)

    const { id } = useParams()
    log.debug('id =', id)

    const locat = useLocation()
    log.debug('Location.state =', locat.state)
    const item = locat.state

    async function Send(e) {
        log.verbs('--- Start function -Send-')
        e.preventDefault()

        const editTag = {
            _id: item._id,
            title: e.target.title.value,
        }
        myFetch_new([editTag], 'tags', 'PATCH').then((result) => {
            log.debug('myFetch result', result)
            if (result.error) toLog(result.error)
            else navigate('/links?tag=' + editTag.title)
        })
    }

    log.verbs('--- Start Render -TagsEdit-')

    return (
        <Paper variant='outlined' sx={{ m: 2, boxShadow: 3, p: 3 }}>
            <Typography variant='h4'>Edit tag: {item.title}</Typography>
            <Typography>
                <Ahref
                    to={'/links?tag=' + item.title}
                    underline='hover'
                    component={RRLink}
                >
                    ID: {item._id}
                </Ahref>
            </Typography>
            <form onSubmit={Send}>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <TextField
                        defaultValue={item.title}
                        // size='small'
                        // fullWidth
                        label='Title'
                        name='title'
                        id='inp-title'
                        // margin='dense'
                        sx={{ width: '100%' }}
                        inputProps={{ style: { fontSize: 30 } }}
                    />
                    <Button
                        variant='contained'
                        endIcon={<SendIcon />}
                        type='submit'
                        // sx={{ minWidth: '100%', mt: 1 }}
                        sx={{ flexShrink: 0 }}
                    >
                        Apply
                    </Button>
                </Box>
            </form>
        </Paper>
    )
}
