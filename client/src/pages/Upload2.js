import { Button, TextField } from '@mui/material'
import WebLogger from 'mylogger/web-version'
import { useState } from 'react'

const log = new WebLogger(null, 'UPLOAD', 'orange')

export default function Upload() {
    const [uploadsNum, setUploadsNum] = useState(1)

    const INPUT_NAME = 'my-upload-file'
    const url = `${process.env.REACT_APP_SERVER}/uploadfile`

    const rows = []
    for (let i = 1; i <= uploadsNum; i++) {
        rows.push(
            <TextField
                id={INPUT_NAME + i}
                name={'upload' + i}
                type='file'
                key={i}
                sx={{ width: '100%' }}
            />
        )
    }

    function changeInputNum(e, mode) {
        // e.preventDefault()
        let a = uploadsNum
        if (mode === '+') {
            a++
        } else {
            a--
        }
        setUploadsNum(a)
    }

    function submit(e) {
        e.preventDefault()
        const formData = new FormData()
        const inputs = document.querySelectorAll(`[id^='${INPUT_NAME}']`)
        for (const input of inputs) {
            log.debug('Filename =', input.files[0].name)
            formData.append('file', input.files[0])
            formData.append('fileName', input.files[0].name)
        }
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                for (const file of data) {
                    log.debug(file.path)
                }
            })
    }

    return (
        <div>
            <h1>Upload</h1>
            <Button
                type='submit'
                variant='contained'
                size='small'
                onClick={(e) => changeInputNum(e, '+')}
            >
                +
            </Button>
            <Button
                type='submit'
                variant='contained'
                size='small'
                onClick={(e) => changeInputNum(e, '-')}
            >
                -
            </Button>
            <form
                onSubmit={submit}
                action={url}
                method='post'
                enctype='multipart/form-data'
            >
                {rows}
                <Button type='submit' variant='contained'>
                    Send
                </Button>
            </form>
        </div>
    )
}
