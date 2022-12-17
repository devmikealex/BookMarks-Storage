import { IconButton } from '@mui/material'
import FileCopyIcon from '@mui/icons-material/FileCopy'

export default function CopyButton() {
    return (
        <IconButton
            // color='Silver'
            onClick={copyToClipboard}
            aria-label='copy'
            sx={{ top: '-4px' }}
        >
            <FileCopyIcon fontSize='small' color='disabled' />
        </IconButton>
    )
}

function copyToClipboard(e) {
    const text = e.currentTarget.previousSibling.textContent
    navigator.clipboard.writeText(text)
    console.info('Copy to the clipboard:', text)
}
