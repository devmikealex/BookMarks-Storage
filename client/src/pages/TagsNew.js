import { Alert, Button, Paper, TextField, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

import WebLogger from 'mylogger/web-version'
import { useRef, useState } from 'react'
import myFetch from '../common/fetch'
import Tags from './Tags'
import Tag from '../components/Tag'
const log = new WebLogger(null, 'TAGSNEW', 'green')

export default function TagsNew(props) {
    log.verbs('--- Start function TagsNew')

    const myInputRef = useRef()

    const [error, setError] = useState(null)
    log.debug('Start error =', error)
    const [newTag, setNewTag] = useState(null)
    log.debug('Start tags =', newTag)

    log.verbs('--- Start Render TagsNew')

    return (
        <Paper variant='outlined' sx={{ m: 2, boxShadow: 3, p: 3 }}>
            <Typography variant='h3'>Create a new tag</Typography>

            <form>
                <TextField
                    fullWidth
                    required
                    label='tag'
                    name='tag'
                    id='inp-tag'
                    margin='dense'
                    inputRef={myInputRef}
                />
                {/* <label>
                    New tag:
                    <input type='text' ref={inputRef} placeholder='title' />
                </label> */}
                <Button
                    variant='contained'
                    endIcon={<SendIcon />}
                    // type='submit'
                    sx={{ minWidth: '100%', mt: 1 }}
                    onClick={Send}
                >
                    Send
                </Button>
                {/* <input type='button' value='Add' onClick={Send} /> */}
            </form>
            {newTag && (
                <Alert severity='success' sx={{ mt: 2 }}>
                    <Typography variant='h6'>New tag added.</Typography>
                    {/* // todo */}
                    <Tag item={newTag[0]} />
                </Alert>
            )}
            {error && (
                <Alert severity='error' sx={{ mt: 2 }}>
                    <Typography variant='h6'>Error while adding!</Typography>
                    <Typography>{error.message}</Typography>
                </Alert>
            )}
            {/* {newTag && <p>New Tag: {JSON.stringify(newTag)}</p>} */}
            {/* {error && <p>Error: {error.message}</p>} */}
            {/* <Tags key={Math.random()} /> */}
        </Paper>
    )

    async function Send() {
        log.verbs('--- Start function Send')
        console.log(myInputRef)

        const newTag = [{ title: myInputRef.current.value }]
        myFetch(newTag, 'tags', 'POST').then((result) => {
            log.debug('myFetch result', result)
            const { errorFetch, resultJSON } = result
            if (errorFetch) {
                setError(resultJSON)
                setNewTag(null)
            } else {
                setError(null)
                setNewTag(resultJSON)
            }
        })
        props.setForceRerender(myInputRef.current.value)
        log.verbs('--- Exit function Send')
    }
}
