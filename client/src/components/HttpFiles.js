import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import WebLogger from 'mylogger/web-version'
import { useState } from 'react'

const log = new WebLogger(null, 'HTTPUPLOAD', 'orange')

const INPUT_NAME = 'my-http-file'

export function submitHttpLinks(e) {
    log.verbs('--- Start function -submitHttpLinks-')
    const imagesLinks = []
    // e.preventDefault()
    const inputs = document.querySelectorAll(`[id^='${INPUT_NAME}']`)
    for (const input of inputs) {
        const imageLink = input.value
        log.debug('imageLink =', imageLink)
        if (imageLink) {
            imagesLinks.push(imageLink)
        }
    }
    return imagesLinks
}

export default function HttpFiles(props) {
    const [uploadsNum, setUploadsNum] = useState(1)

    const rows = []
    for (let i = 1; i <= uploadsNum; i++) {
        rows.push(
            <Paper
                elevation={0}
                variant='outlined'
                key={i}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 0.6,
                    mb: 0.6,
                }}
            >
                <TextField
                    fullWidth
                    label='http://...'
                    size='small'
                    id={INPUT_NAME + i}
                    name={'uploadhttp' + i}
                    onChange={changeImage}
                    onKeyPress={(e) => {
                        e.key === 'Enter' && e.preventDefault()
                    }}
                />
                <img
                    hidden
                    id={'img-' + INPUT_NAME + i}
                    height='200px'
                    src='#'
                    alt='preview'
                    style={{ marginLeft: '4px' }}
                />
            </Paper>
        )
    }

    function changeImage(e) {
        const link = e.target.value
        const img = document.getElementById('img-' + e.target.id)
        if (link) {
            img.src = link
            img.removeAttribute('hidden')
        }
        // if (props.funcAddImage) props.funcAddImage(e.target.value)
    }

    function changeInputNum(e, mode) {
        if (mode === '+') {
            setUploadsNum(uploadsNum + 1)
        } else {
            setUploadsNum(uploadsNum - 1)
        }
    }

    const style = {
        minWidth: '40px',
        minHeight: '10px',
        lineHeight: '1',
        marginX: 0.3,
        marginY: 0.7,
    }

    return (
        <div>
            <Typography variant='body1' component='span' sx={{ mr: 1 }}>
                Add link to images: {uploadsNum}
            </Typography>
            <Button
                variant='outlined'
                size='small'
                onClick={(e) => changeInputNum(e, '+')}
                sx={style}
            >
                +
            </Button>
            <Button
                variant='outlined'
                size='small'
                onClick={(e) => changeInputNum(e, '-')}
                sx={style}
            >
                -
            </Button>
            {rows}
        </div>
    )
}
