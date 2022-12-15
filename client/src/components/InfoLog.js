// import './InfoLog.css'

import { IconButton, Paper, Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'

export default function InfoLog(props) {
    const { history } = props

    const [open, setOpen] = useState(false)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false)
    }

    const action = (
        <>
            <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={handleClose}
            >
                <CloseIcon fontSize='small' />
            </IconButton>
        </>
    )

    useEffect(() => {
        if (history[0]?.message) setOpen(true)
    }, [history])

    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    maxHeight: '10em',
                    // overflow: 'hidden',
                    overflowY: 'auto',
                    fontSize: '15px',
                    lineHeight: '1.8em',
                    backgroundColor: 'unset',
                }}
            >
                <ul>
                    {history.map((item) => {
                        return <li key={item.time}>{item.message}</li>
                    })}
                </ul>
            </Paper>
            <hr />
            <Snackbar
                open={open}
                onClose={handleClose}
                action={action}
                autoHideDuration={5000}
                message={history[0]?.message}
            />
        </>
    )
}