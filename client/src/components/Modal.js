import { Box, Button, Modal, Typography } from '@mui/material'
import WebLogger from 'mylogger/web-version'
import { useState } from 'react'

const log = new WebLogger(null, 'MODAL', 'blue')

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
}

export default function AlertModal(props) {
    const { open, setModalOpen, modalInfo } = props
    log.verbs('--- Start function Modal')

    // const [open, setOpen] = useState(false)
    // const handleOpen = () => setOpen(true)
    // const handleClose = () => setOpen(false)

    log.verbs('--- Start Render Modal')

    return (
        <Modal open={open} onClose={() => setModalOpen(false)}>
            <Box sx={style}>
                <Typography variant='h5'>{modalInfo.title}</Typography>
                <Typography sx={{ mt: 1 }}>{modalInfo.message}</Typography>
                <Button
                    sx={{ mt: 2 }}
                    variant='contained'
                    color='error'
                    onClick={() => {
                        modalInfo.funcYes(modalInfo.args)
                        setModalOpen(false)
                    }}
                >
                    {modalInfo.button}
                </Button>
            </Box>
        </Modal>
    )
}
