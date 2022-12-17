import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'

export default function CopyButton(props) {
    const navigate = useNavigate()

    function openForEdit(e) {
        navigate('/links/edit/' + props.item._id, { state: props.item })
    }

    return (
        <IconButton onClick={openForEdit} aria-label='copy' sx={{ top: '-4px' }}>
            <EditIcon fontSize='small' color='disabled' />
        </IconButton>
    )
}
