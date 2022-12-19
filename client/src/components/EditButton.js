import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'

export default function EditButton(props) {
    const navigate = useNavigate()

    function openForEdit(e) {
        if (props.tag) {
            navigate('/tags/edit/' + props.item._id, { state: props.item })
        } else {
            navigate('/links/edit/' + props.item._id, { state: props.item })
        }
    }

    return (
        <IconButton
            onClick={openForEdit}
            aria-label='copy'
            sx={{ top: '-4px', ...props.sx }}
        >
            <EditIcon fontSize='small' color='disabled' />
        </IconButton>
    )
}
