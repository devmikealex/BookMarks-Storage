import { Box } from '@mui/system'

export default function DateComp({ item }) {
    let date1 = (
        <div>
            Created: {new Date(item.crt_date).toLocaleString()} <br />
        </div>
    )
    const newdate = item.mod_date.slice(0, 16)
    const oldDate = item.crt_date.slice(0, 16)
    let date2 = null
    if (newdate !== oldDate)
        date2 = (
            <div>
                Changed: {new Date(item.mod_date).toLocaleString()} <br />
            </div>
        )

    return (
        <Box sx={{ display: 'flex', gap: 2, color: 'grey' }}>
            {date1}
            {date2}
        </Box>
    )
}
