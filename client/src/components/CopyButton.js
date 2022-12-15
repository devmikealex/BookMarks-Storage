import { IconButton } from '@mui/material'
import FileCopyIcon from '@mui/icons-material/FileCopy'

export default function CopyButton() {
    return (
        <IconButton
            color='black'
            onClick={copyToClipboard}
            aria-label='copy'
            sx={{ top: '-4px' }}
        >
            <FileCopyIcon fontSize='small' />
        </IconButton>
    )
}

function copyToClipboard(e) {
    const text = e.currentTarget.previousSibling.textContent
    navigator.clipboard.writeText(text)
    console.info('Copy to the clipboard:', text)
}
