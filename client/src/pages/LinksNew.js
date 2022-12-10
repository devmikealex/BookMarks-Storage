import { Alert, Button, Paper, TextField, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

import myFetch from '../common/fetch'
import WebLogger from 'mylogger/web-version'
import Tags from './Tags'
import { useState } from 'react'
import Link from '../components/Link'
const log = new WebLogger(null, 'LinksNEW', 'magenta')

export default function LinksNew() {
    log.verbs('--- Start function -LinksNew-')

    const [error, setError] = useState(null)
    log.debug('Start error =', error)
    const [newLinks, setNewLinks] = useState(null)
    log.debug('Start newLinks =', newLinks)

    const [tagsValue, setTagsValue] = useState('')
    const handleChange = (event) => {
        setTagsValue(event.target.value)
    }

    async function Send(e) {
        log.verbs('--- Start function -Send-')
        e.preventDefault()

        const res = await myFetch(null, 'tags', 'GET')
        log.debug('---------myFetch result', res)
        const { errorFetch, resultJSON: tags } = res
        if (errorFetch) {
            setError(tags)
            return
        } else {
            setError(null)
        }
        log.silly('tags', tags)

        const tagsName = e.target.tags.value.split(', ')
        log.debug('tagsName', tagsName)

        const tagsID = tagsName.map((item) => {
            const tag = tags.find((element) => element.title === item)
            return tag._id
        })
        log.debug('tagsID', tagsID)

        const newLink = {
            title: e.target.title.value,
            url: e.target.url.value,
            description: e.target.description.value,
            tags: tagsID,
            images: e.target.images.value.split(', '),
        }
        myFetch([newLink], 'links', 'POST').then((result) => {
            log.debug('myFetch result', result)
            const { errorFetch, resultJSON } = result
            if (errorFetch) {
                setError(resultJSON)
                setNewLinks(null)
            } else {
                setError(null)
                setNewLinks(resultJSON)
            }
        })
        log.verbs('--- Exit function -Send-')
    }
    log.verbs('--- Start Render -LinksNew-')
    return (
        <Paper variant='outlined' sx={{ m: 2, boxShadow: 3, p: 3 }}>
            <Typography variant='h3'>Create a new link</Typography>
            <form onSubmit={Send}>
                <TextField
                    fullWidth
                    label='Title'
                    name='title'
                    id='inp-title'
                    margin='dense'
                />
                <TextField
                    fullWidth
                    required
                    label='URL'
                    name='url'
                    id='inp-url'
                    margin='dense'
                />
                <TextField
                    fullWidth
                    label='Description'
                    name='description'
                    id='inp-description'
                    multiline
                    rows={4}
                    margin='dense'
                />
                <TextField
                    fullWidth
                    label='Tags'
                    name='tags'
                    id='inp-tags'
                    margin='dense'
                    multiline
                    maxRows={4}
                    value={tagsValue}
                    onChange={handleChange}
                    // onChange={(e) => {
                    // console.log('77777777777')
                    // this.setState({ shrink: e.target.value })
                    // }}
                    helperText='Some important text'
                    InputLabelProps={{ shrink: tagsValue.value }}
                    // onChange={() => {}}
                />
                <Tags setTagsValue={setTagsValue} />
                <TextField
                    fullWidth
                    label='Previews'
                    name='images'
                    id='inp-images'
                    margin='dense'
                />
                <Button
                    variant='contained'
                    endIcon={<SendIcon />}
                    type='submit'
                    sx={{ minWidth: '100%', mt: 1 }}
                >
                    Send
                </Button>
            </form>
            {newLinks && (
                <Alert severity='success' sx={{ mt: 2 }}>
                    <Typography variant='h6'>New links added.</Typography>
                    {newLinks.map((item) => {
                        return <Link item={item} key={item._id} />
                    })}
                </Alert>
            )}
            {error && (
                <Alert severity='error' sx={{ mt: 2 }}>
                    <Typography variant='h6'>Error while adding!</Typography>
                    <Typography>{error.message}</Typography>
                </Alert>
            )}
        </Paper>
    )
}