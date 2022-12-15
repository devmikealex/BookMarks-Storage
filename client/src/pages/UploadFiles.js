import { Button, TextField, Typography } from '@mui/material'
import WebLogger from 'mylogger/web-version'
import { useState } from 'react'

const log = new WebLogger(null, 'UPLOAD', 'orange')

const INPUT_NAME = 'my-upload-file'
const url = `${process.env.REACT_APP_SERVER}/uploadfile`

export function submitFiles(e) {
    log.verbs('--- Start function -submitFiles-')

    const files = []

    // e.preventDefault()
    const formData = new FormData()
    const inputs = document.querySelectorAll(`[id^='${INPUT_NAME}']`)
    for (const input of inputs) {
        const fileName = input.files[0]?.name
        log.debug('Filename =', fileName)
        if (fileName) {
            formData.append('file', input.files[0])
            formData.append('fileName', input.files[0].name)
            files.push(input.files[0].name)
        }
    }
    fetch(url, {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            for (const file of data) {
                log.http(file.path)
            }
        })
    log.verbs('Return files =', files)
    log.debug('--- Exit function -submitFiles-')
    return files
}

export default function Upload() {
    const [uploadsNum, setUploadsNum] = useState(1)

    const rows = []
    for (let i = 1; i <= uploadsNum; i++) {
        rows.push(
            <div key={i}>
                <TextField
                    id={INPUT_NAME + i}
                    name={'upload' + i}
                    onChange={changeImage}
                    type='file'
                    inputProps={{ accept: 'image/*' }}
                    sx={{ width: '100%', pb: 1 }}
                />
                <img
                    hidden
                    id={'img-' + INPUT_NAME + i}
                    height='200px'
                    src='#'
                    alt='preview'
                />
            </div>
        )
    }

    function changeImage(e) {
        const file = e.target.files[0]
        const img = document.getElementById('img-' + e.target.id)
        if (file) {
            img.src = URL.createObjectURL(file)
            img.removeAttribute('hidden')
        }
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
            {/* <h1>Upload</h1> */}
            <Typography variant='body1' component='span' sx={{ mr: 1 }}>
                Upload preview images
            </Typography>
            <Button
                type='submit'
                variant='outlined'
                size='small'
                onClick={(e) => changeInputNum(e, '+')}
                sx={style}
            >
                +
            </Button>
            <Button
                type='submit'
                variant='outlined'
                size='small'
                onClick={(e) => changeInputNum(e, '-')}
                sx={style}
            >
                -
            </Button>
            {/* <Button onClick={submitFiles} variant='contained' size='small'>
                Send
            </Button> */}
            {rows}
        </div>
    )
}
