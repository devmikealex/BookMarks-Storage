import { Box, Button, Typography } from '@mui/material'

const PATH_TO_PREVIEW = process.env.REACT_APP_SERVER + '/static/images/'

export default function ImagePreview(props) {
    let button = null,
        title = null
    const saveStatus = props.saveStatus
    if (props.funcDelete) {
        button = (
            <Button
                color={saveStatus ? 'primary' : 'error'}
                variant={saveStatus ? 'outlined' : 'contained'}
                size='small'
                onClick={() => props.funcDelete(props.image)}
                sx={{ mt: -0.5 }}
            >
                Delete
            </Button>
        )
        title = <Typography>{props.image}</Typography>
    }
    return (
        <Box sx={{ display: 'inline-block', textAlign: 'center' }}>
            {title}
            <img
                src={PATH_TO_PREVIEW + props.image}
                width='300px'
                height='200px'
                alt='preview'
                style={{ objectFit: 'cover', marginRight: '6px' }}
            />
            <br />
            {button}
        </Box>
    )
}
