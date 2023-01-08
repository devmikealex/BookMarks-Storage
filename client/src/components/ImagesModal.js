import { Box, Button, Modal, Typography } from '@mui/material'
import WebLogger from 'mylogger/web-version'
import { useEffect, useRef, useState } from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import getID from '../common/getid'

let genGetID = getID()

const log = new WebLogger(null, 'MODAL', 'blue')

const PATH_TO_PREVIEW = window.PathToBMServer + '/static/images/'

const style1 = {
    position: 'absolute',
    // top: '95%',
    bottom: '1%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: 1,
    // p: 1,
}
const style = {
    maxWidth: '95%',
    maxHeight: '95%',
    textAlign: 'center',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 1,
    borderRadius: 1,
}

export default function ImagesModal(props) {
    const { open, setImagesModalOpen, imagesModal } = props
    log.verbs('--- Start function ImagesModal')

    const [forceRerender, setForceRerender] = useState(true)
    const forCheck = useRef()
    const [currentImageTemp, setCurrentImageTemp] = useState(imagesModal.image)
    let currentImage = imagesModal.image
    // if (imagesModal.images.includes(currentImageTemp)) currentImage = currentImageTemp
    if (imagesModal === forCheck.current) currentImage = currentImageTemp
    else forCheck.current = imagesModal
    // useEffect(() => {
    //     console.log('asddddddddddddddddddddddd')
    //     setCurrentImage(imagesModal.image)
    // }, [imagesModal])

    // let currentImage = imagesModal.image
    log.debug('Start currentImage =', currentImage)

    log.debug('Images =', imagesModal.images)

    let linkTOimage = PATH_TO_PREVIEW
    if (/^https?:\/\//.test(currentImage)) linkTOimage = ''

    function selectOtherImage(mode) {
        console.log(
            '🚀 ~ file: ImagesModal.js:42 ~ ImagesModal ~ currentImageTemp',
            currentImageTemp
        )
        let newImageIndex = imagesModal.images.indexOf(currentImage)
        console.log(
            '🚀 ~ file: ImagesModal.js:62 ~ selectOtherImage ~ currentImage',
            currentImage
        )
        console.log('newImageIndex-1:', newImageIndex)
        const len = imagesModal.images.length
        console.log('length', len)
        if (mode === 'next') {
            newImageIndex++
            newImageIndex = newImageIndex % len
        } else {
            newImageIndex--
            if (newImageIndex < 0) newImageIndex = len - 1
        }
        console.log('newImageIndex-2:', newImageIndex)
        console.log(imagesModal.images)
        // currentImage = imagesModal.images[newImageIndex]
        // setForceRerender(currentImage)
        setCurrentImageTemp(imagesModal.images[newImageIndex])
        setForceRerender(genGetID.next().value)
        console.log(
            '🚀 ~ file: ImagesModal.js:76 ~ selectOtherImage ~ imagesModal.images[newImageIndex]',
            imagesModal.images[newImageIndex]
        )
    }

    return (
        <Modal
            open={open}
            onClose={() => setImagesModalOpen(false)}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Box sx={style}>
                <Box
                    component='img'
                    alt={currentImage}
                    src={linkTOimage + currentImage}
                    onClick={() => selectOtherImage('next')}
                    sx={{
                        // width: '100%',
                        // height: '100%',
                        // maxWidth: '100%',
                        // height: 'auto',
                        display: 'block',
                        margin: '0 auto',
                        maxWidth: '80vh',
                        maxHeight: '80vh',
                    }}
                    onLoad={(e) => {
                        const img = e.target
                        // if (img.height > img.width) {
                        //     console.log('file 1111111')
                        //     // img.height = '100%'
                        //     // img.width = '50'
                        //     img.style.maxWidth = ''
                        //     img.style.maxHeight = '70vh'
                        // } else {
                        //     console.log('file 222222')
                        //     img.style.maxWidth = '100%'
                        //     img.style.height = 'auto'
                        // }
                        const desc = img.nextSibling
                        desc.style.width = img.width + 'px'
                    }}
                />
                <Box
                // sx={{
                //     display: 'flex',
                //     justifyContent: 'space-between',
                //     flexWrap: 'wrap',
                //     gap: 2,
                // }}
                >
                    <Typography variant='body1' sx={{ fontWeight: '600' }}>
                        {imagesModal.title}
                    </Typography>
                    <Typography variant='body1'>{currentImage}</Typography>
                </Box>
                <Box sx={style1}>
                    <Button size='small' onClick={() => selectOtherImage('prev')}>
                        <ArrowBackIcon />
                    </Button>
                    <Button size='small' onClick={() => setImagesModalOpen(false)}>
                        &#10006;
                    </Button>
                    <Button size='small' onClick={() => selectOtherImage('next')}>
                        <ArrowForwardIcon />
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}
