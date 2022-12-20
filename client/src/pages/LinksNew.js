import {
    Alert,
    Box,
    Button,
    IconButton,
    LinearProgress,
    Paper,
    TextField,
    Typography,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

import myFetch, { myFetch_new } from '../common/fetch'
import WebLogger from 'mylogger/web-version'
import Tags from './Tags'
import UploadFiles, { submitFiles } from '../components/UploadFiles'
import { useContext, useRef, useState } from 'react'
import Link from '../components/Link'
import Context from '../common/context'
import { useNavigate } from 'react-router-dom'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import getURLinfo from '../common/geturlinfo'
import HttpFiles, { submitHttpLinks } from '../components/HttpFiles'
const log = new WebLogger(null, 'LinksNEW', 'magenta')

export default function LinksNew() {
    log.verbs('--- Start function -LinksNew-')

    const navigate = useNavigate()

    const { toLog } = useContext(Context)

    // const titleInputRef = useRef()

    const [errorResult, setErrorResult] = useState({ error: null, json: null })
    log.debug('Start errorResult =', errorResult)
    const newLinks = errorResult.json

    // const [error, setError] = useState(null)
    // log.debug('Start error =', error)
    // const [newLinks, setNewLinks] = useState(null)
    // log.debug('Start newLinks =', newLinks)

    const [loading, setLoading] = useState(false)

    const [titleValue, setTitleValue] = useState('')
    log.debug('Start titleValue =', titleValue)
    const [decriptionValue, setDecriptionValue] = useState('')
    log.debug('Start decriptionValue =', decriptionValue)

    const [tagsValue, setTagsValue] = useState('')
    const handleChange = (event) => {
        setTagsValue(event.target.value)
    }

    async function Send(e) {
        log.verbs('--- Start function -Send-')
        e.preventDefault()

        const res = await myFetch_new(null, 'tags', 'GET')
        log.debug('---------myFetch result', res)
        // const { errorFetch, resultJSON: tags } = res
        // const { error: errorFetch, json: tags } = res
        // setErrorResult(res)
        toLog(res.error)
        const tags = res.json
        const errorFetch = res.error

        if (errorFetch) {
            log.error('Error errorFetch for GET tags', res)
            // setError(tags)
            setErrorResult(...errorResult, errorFetch)
            return
        } else {
            // setError(null)
        }
        log.silly('tags', tags)

        let tagsID
        if (e.target.tags.value.trim() !== '') {
            const tagsName = e.target.tags.value.split(', ')
            log.debug('tagsName', tagsName)
            tagsID = tagsName.map((item) => {
                const tag = tags.find((element) => element.title === item)
                return tag._id
            })
        } else {
            tagsID = []
        }
        log.debug('tagsID', tagsID)

        const images = [...submitFiles(), ...submitHttpLinks()]

        const newLink = {
            title: e.target.title.value,
            url: e.target.url.value,
            description: e.target.description.value,
            tags: tagsID,
            // images: e.target.images.value.split(', '),
            images: images,
        }
        myFetch_new([newLink], 'links', 'POST').then((result) => {
            log.debug('myFetch result', result)
            console.log('aaaaa', result.json)
            setErrorResult(result)
            toLog(result.error)
            log.debug('New link ID', result.json[0]._id)
            navigate('/links/' + result.json[0]._id)

            // const { errorFetch, resultJSON } = result
            // if (errorFetch) {
            //     setError(resultJSON)
            //     setNewLinks(null)
            // } else {
            //     setError(null)
            //     setNewLinks(resultJSON)
            // }
        })
        log.verbs('--- Exit function -Send-')
    }
    log.verbs('--- Start Render -LinksNew-')
    return (
        <Paper variant='outlined' sx={{ m: 2, boxShadow: 3, p: 3 }}>
            <Typography variant='h4'>Create a new link</Typography>
            <form onSubmit={Send}>
                <TextField
                    size='small'
                    fullWidth
                    label='Title'
                    name='title'
                    id='inp-title'
                    margin='dense'
                    value={titleValue}
                    onChange={(e) => {
                        setTitleValue(e.target.value)
                    }}
                    InputLabelProps={{ shrink: titleValue.value }}
                    inputProps={{ style: { fontSize: 30 } }}
                />
                <Box sx={{ display: 'flex', gap: 1, mt: 1, mb: 0.5 }}>
                    <TextField
                        size='small'
                        fullWidth
                        required
                        label='URL'
                        name='url'
                        id='inp-url'
                        // margin='dense'
                        sx={{ width: '100%' }}
                    />
                    <Button
                        variant='outlined'
                        endIcon={<UploadFileIcon />}
                        sx={{ flexShrink: 0 }}
                        onClick={async () => {
                            setLoading(true)
                            const res = await getURLinfo(
                                toLog
                                // setLoading,
                                // setTitleValue,
                                // setDecriptionValue
                            )
                            setLoading(false)
                            setTitleValue(res.title)
                            setDecriptionValue(res.description)
                        }}
                    >
                        Read info
                        {/* <UploadFileIcon fontSize='small' /> */}
                    </Button>
                </Box>

                {loading && <LinearProgress />}
                <TextField
                    value={decriptionValue}
                    size='small'
                    fullWidth
                    label='Description'
                    name='description'
                    id='inp-description'
                    multiline
                    // rows={2}
                    minRows={2}
                    maxRows={10}
                    margin='dense'
                    onChange={(e) => {
                        setDecriptionValue(e.target.value)
                    }}
                    InputLabelProps={{ shrink: decriptionValue.value }}
                    inputProps={{ style: { fontSize: '1.5em', lineHeight: '1.3em' } }}
                />
                <TextField
                    size='small'
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
                    // helperText='Some important text'
                    InputLabelProps={{ shrink: tagsValue.value }}
                    // onChange={() => {}}
                />
                <Tags setTagsValue={setTagsValue} buttonType='outlined' />
                {/* <TextField
                    fullWidth
                    label='Previews'
                    name='images'
                    id='inp-images'
                    margin='dense'
                /> */}
                <UploadFiles />
                <HttpFiles />
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
            {errorResult.error && (
                <Alert severity='error' sx={{ mt: 2 }}>
                    <Typography variant='h6'>Error while adding!</Typography>
                    <Typography>{errorResult.error}</Typography>
                </Alert>
            )}
        </Paper>
    )
}
