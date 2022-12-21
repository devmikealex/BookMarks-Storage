import { Box, Button, Modal, Typography } from '@mui/material'
import WebLogger from 'mylogger/web-version'

const log = new WebLogger(null, 'MODAL', 'blue')

const PATH_TO_PREVIEW = process.env.REACT_APP_SERVER + '/static/images/'

const style1 = {
    position: 'absolute',
    top: '95%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 1,
}
const style = {
    maxWidth: '100%',
    maxHeight: '100%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 1,
}

export default function ImagesModal(props) {
    const { open, setImagesModalOpen, imagesModal } = props
    log.verbs('--- Start function ImagesModal')

    // const [first, setfirst] = useState(second)

    const currentImage = imagesModal.image
    let linkTOimage = PATH_TO_PREVIEW
    if (/^https?:\/\//.test(currentImage)) linkTOimage = ''

    function selectOtherImage(mode) {
        console.log('imagesModal', imagesModal)
        console.log(imagesModal.images.indexOf(currentImage))
        if (mode === 'next') {
        } else {
        }
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
                    onClick={() => setImagesModalOpen(false)}
                    sx={{
                        width: '100%',
                        height: '100%',
                        //     height: 233,
                        //     width: 350,
                        //     maxHeight: { xs: 233, md: 167 },
                        //     maxWidth: { xs: 350, md: 250 },
                    }}
                />
                <Typography variant='body1'>{imagesModal.title}</Typography>
                <Typography variant='body1'>{currentImage}</Typography>
                <Box sx={style1}>
                    <Button onClick={() => selectOtherImage('prev')}>Prev</Button>
                    <Button onClick={() => selectOtherImage('next')}>Next</Button>
                </Box>
            </Box>
        </Modal>
    )
}
