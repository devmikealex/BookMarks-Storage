// File upload in Material UI - kiranvj
// https://kiranvj.com/blog/blog/file-upload-in-material-ui/

import AddIcon from '@mui/icons-material/Add'
import { Button, Fab, TextField } from '@mui/material'

export default function Upload() {
    return (
        <div>
            <form action='submit'>
                <div>Upload</div>
                <TextField name='upload-photo1' type='file' />
                <br />
                <TextField name='upload-photo2' type='file' />
                <br />
                <br />
                <label htmlFor='upload-photo3'>
                    <input
                        style={{ display: 'none' }}
                        id='upload-photo3'
                        name='upload-photo3'
                        type='file'
                    />
                    <Button color='secondary' variant='contained' component='span'>
                        Upload button
                    </Button>
                </label>
                <br />
                <br />
                <label htmlFor='upload-photo4'>
                    <input
                        style={{ display: 'none' }}
                        id='upload-photo4'
                        name='upload-photo4'
                        type='file'
                        onChange={(event) => {
                            const files = event.target.files
                            console.log('🚀 ~ file: Upload.js:38 ~ Upload ~ files', files)
                        }}
                    />
                    <Fab
                        color='secondary'
                        size='small'
                        component='span'
                        aria-label='add'
                        variant='extended'
                    >
                        <AddIcon /> Upload photo
                    </Fab>
                    <br />
                    <br />
                    <Fab color='primary' size='small' component='span' aria-label='add'>
                        <AddIcon />
                    </Fab>
                </label>
            </form>
        </div>
    )
}
