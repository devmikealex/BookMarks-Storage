import { Alert, Box, Button, Paper, TextField, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

import { myFetch_new } from '../common/fetch'
import WebLogger from 'mylogger/web-version'
import Tags from './Tags'
import UploadFiles, { submitFiles } from '../components/UploadFiles'
import { useContext, useEffect, useRef, useState } from 'react'
import Link from '../components/Link'
import Context from '../common/context'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import ImagePreview from '../components/ImagePreview'

import Ahref from '@mui/material/Link'
import { Link as RRLink } from 'react-router-dom'
import HttpFiles, { submitHttpLinks } from '../components/HttpFiles'

const log = new WebLogger(null, 'LinksEdit', 'DarkViolet')

export default function LinksEdit() {
    log.verbs('--- Start function -LinksEdit-')

    // const { item } = props

    const navigate = useNavigate()

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

    const oldTagsID = useRef()
    useEffect(() => {
        oldTagsID.current = item.tags.map((item) => item._id)
    }, [])

    // const [imagesValue, setImagesValue] = useState(item.images.join(', '))
    // const handleChangeImages = (event) => {
    //     setImagesValue(event.target.value)
    // }
    function convertToMap(images) {
        log.verbs('--- Start function -convertToMap-')
        let newMap = new Map()
        images.forEach((element) => {
            newMap.set(element, true)
            log.debug('newImages =', newMap)
        })
        return newMap
    }
    const [newImages, setNewImages] = useState(convertToMap(item.images))

    function funcDeleteImage(image) {
        // log.debug('Image for delete =', image)
        // const temp = newImages.filter((item) => item !== image)
        // log.debug('newImages =', temp)
        newImages.set(image, !newImages.get(image))
        setNewImages(new Map(newImages))
        log.debug('newImages =', newImages)
    }
    // function funcAddImage(image) {
    //     log.debug('newImages =', newImages)
    //     log.debug('Image for delete =', image)
    //     const temp = [...newImages, image]
    //     log.debug('newImages =', temp)
    //     setNewImages(temp)
    // }

    async function Send(e) {
        log.verbs('--- Start function -Send-')
        e.preventDefault()

        let images = []
        for (let image of newImages) {
            if (image[1]) images.push(image[0])
        }

        log.debug('images 1 =', images)
        const images2 = [...submitFiles(), ...submitHttpLinks()]

        images = [...images, ...images2]
        log.debug('images 2 =', images)

        //TODO тут много похожего с "новой ссылкой"

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
            // setErrorResult(...errorResult, errorFetch)
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

        const editLink = {
            _id: item._id,
            title: e.target.title.value,
            url: e.target.url.value,
            description: e.target.description.value,
            tags: tagsID,
            // images: e.target.images.value.split(', '),
            images: images,
            mod_date: new Date(),
        }
        myFetch_new([editLink], 'links', 'PATCH').then((result) => {
            log.debug('myFetch result', result)
            // setErrorResult(result)
            toLog(result.error)

            if (!result.error) {
                const newTagsIDarr = tagsID
                const oldTagsIDarr = oldTagsID.current

                const tagsIDforDEC = oldTagsIDarr.filter(
                    (tagID) => !newTagsIDarr.includes(tagID)
                )
                const tagsIDforINC = newTagsIDarr.filter(
                    (tagID) => !oldTagsIDarr.includes(tagID)
                )

                tagsIDforINC.forEach((tagID) => {
                    myFetch_new(null, 'tags/counters/inc/' + tagID, 'GET').then(
                        (result) => {
                            log.debug('Counters INC:', result)
                        }
                    )
                })
                tagsIDforDEC.forEach((tagID) => {
                    myFetch_new(null, 'tags/counters/dec/' + tagID, 'GET').then(
                        (result) => {
                            log.debug('Counters DEC:', result)
                        }
                    )
                })
            }

            navigate('/links/' + item._id)
        })
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
                    disabled
                    maxRows={4}
                    onChange={handleChange}
                    // TODO Check this shrink value
                    InputLabelProps={{ shrink: tagsValue.value }}
                />
                <Tags
                    setTagsValue={setTagsValue}
                    buttonType='outlined'
                    currentTags={tagsValue}
                />
                {/* TODO проверять состояние тегов, если они есть в строке */}
                {/* TODO список файлов с картинками и удалением */}
                {/* <UploadFiles /> */}
                <Box>
                    {item.images.map((image) => {
                        return (
                            <ImagePreview
                                image={image}
                                funcDelete={funcDeleteImage}
                                saveStatus={newImages.get(image)}
                                key={image}
                            />
                        )
                    })}
                </Box>
                <UploadFiles />
                <HttpFiles />
                {/* <TextField
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
                /> */}
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
