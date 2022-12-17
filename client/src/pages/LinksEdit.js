import { Alert, Box, Button, Paper, TextField, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

import { myFetch_new } from '../common/fetch'
import WebLogger from 'mylogger/web-version'
import Tags from './Tags'
import UploadFiles, { submitFiles } from './UploadFiles'
import { useContext, useState } from 'react'
import Link from '../components/Link'
import Context from '../common/context'
import { useLocation, useParams } from 'react-router-dom'
import ImagePreview from '../components/ImagePreview'

import Ahref from '@mui/material/Link'
import { Link as RRLink } from 'react-router-dom'

const log = new WebLogger(null, 'LinksEdit', 'DarkViolet')

export default function LinksEdit() {
    log.verbs('--- Start function -LinksEdit-')

    // const { item } = props

    const { toLog } = useContext(Context)

    const { id } = useParams()
    log.debug('id =', id)

    const locat = useLocation()
    log.debug('Location.state =', locat.state)
    const item = locat.state

    const tagsName = item.tags.map((item) => item.title)
    const [tagsValue, setTagsValue] = useState(tagsName.join(', '))
    const handleChange = (event) => {
        setTagsValue(event.target.value)
    }

    // const [imagesValue, setImagesValue] = useState(item.images.join(', '))
    // const handleChangeImages = (event) => {
    //     setImagesValue(event.target.value)
    // }
    const [newImages, setNewImages] = useState(item.images)

    function funcDeleteImage(image) {
        log.debug('newImages =', newImages)
        log.debug('Image for delete =', image)
        const temp = newImages.filter((item) => item !== image)
        log.debug('newImages =', temp)
        setNewImages(temp)
    }
    function funcAddImage(image) {
        log.debug('newImages =', newImages)
        log.debug('Image for delete =', image)
        const temp = [...newImages, image]
        log.debug('newImages =', temp)
        setNewImages(temp)
    }

    async function Send(e) {
        log.verbs('--- Start function -Send-')
        e.preventDefault()
    }

    log.verbs('--- Start Render -LinksEdit-')

    return (
        <Paper variant='outlined' sx={{ m: 2, boxShadow: 3, p: 3 }}>
            <Typography variant='h4'>Edit link</Typography>
            <Typography>
                <Ahref to={'/links/' + item._id} underline='hover' component={RRLink}>
                    ID: {item._id}
                </Ahref>
            </Typography>
            <form onSubmit={Send}>
                <TextField
                    defaultValue={item.title}
                    size='small'
                    fullWidth
                    label='Title'
                    name='title'
                    id='inp-title'
                    margin='dense'
                />
                <TextField
                    defaultValue={item.url}
                    size='small'
                    fullWidth
                    required
                    label='URL'
                    name='url'
                    id='inp-url'
                    margin='dense'
                />
                <TextField
                    defaultValue={item.description}
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
                />
                <TextField
                    // defaultValue={aaaa}
                    value={tagsValue}
                    size='small'
                    fullWidth
                    label='Tags'
                    name='tags'
                    id='inp-tags'
                    margin='dense'
                    multiline
                    maxRows={4}
                    onChange={handleChange}
                    // TODO Check this shrink value
                    InputLabelProps={{ shrink: tagsValue.value }}
                />
                <Tags setTagsValue={setTagsValue} buttonType='outlined' />
                {/* TODO проверять состояние тегов, если они есть в строке */}
                {/* TODO список файлов с картинками и удалением */}
                {/* <UploadFiles /> */}
                <Box>
                    {item.images.map((image) => {
                        return (
                            <ImagePreview
                                image={image}
                                funcDelete={funcDeleteImage}
                                key={image}
                            />
                        )
                    })}
                </Box>
                <UploadFiles funcAddImage={funcAddImage} />
                <TextField
                    size='small'
                    fullWidth
                    variant='filled'
                    label='Images'
                    name='images'
                    id='inp-images'
                    margin='dense'
                    multiline
                    maxRows={2}
                    value={newImages.join(', ')}
                    // onChange={handleChangeImages}
                    // TODO Check this shrink value
                    // InputLabelProps={{ shrink: imagesValue.value }}
                />
                <Button
                    variant='contained'
                    endIcon={<SendIcon />}
                    type='submit'
                    sx={{ minWidth: '100%', mt: 1 }}
                >
                    Apply
                </Button>
            </form>
        </Paper>
    )
}
