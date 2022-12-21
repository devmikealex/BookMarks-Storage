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
        title = (
            <Typography
                sx={{ maxWidth: '280px', maxHeight: '1.5em', overflow: 'hidden' }}
            >
                {props.image}
            </Typography>
        )
    }
    let linkTOimage = PATH_TO_PREVIEW
    // if (props.image.startsWith('http')) linkTOimage = ''
    if (/^https?:\/\//.test(props.image)) linkTOimage = ''

    return (
        <Box sx={{ display: 'inline-block', textAlign: 'center' }}>
            {title}
            <img
                src={linkTOimage + props.image}
                width='300px'
                height='200px'
                alt={props.image}
                onClick={props.onClick}
                style={{
                    cursor: 'pointer',
                    objectFit: 'cover',
                    marginRight: '10px',
                    border: '1px solid grey',
                }}
            />
            <br />
            {button}
        </Box>
    )
}
