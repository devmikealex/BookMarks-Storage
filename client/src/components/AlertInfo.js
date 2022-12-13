import { Alert, Typography } from '@mui/material'
import Tag from './Tag'

import './AlertInfo.css'

export default function AlertInfo({ errorResult, goodMessage, children }) {
    return (
        <div>
            {errorResult.json && (
                <AlertMy label={goodMessage} severity='success'>
                    {/* {children} */}
                    <Tag item={errorResult.json[0]} />
                </AlertMy>
            )}
            {errorResult.error && (
                <AlertMy label='Error while processing!' severity='error'>
                    <Typography>{errorResult.error}</Typography>
                </AlertMy>
            )}
        </div>
    )
}

function AlertMy(props) {
    return (
        <Alert severity={props.severity} sx={{ mt: 2 }}>
            <Typography variant='h6'>{props.label}</Typography>
            {props.children}
        </Alert>
    )
}
