import AlertInfo from '../components/AlertInfo'
import WebLogger from 'mylogger/web-version'
import { myFetch_new } from '../common/fetch'

import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { useContext, useRef, useState } from 'react'
import Context from '../common/context'

const log = new WebLogger(null, 'TAGSNEW', 'green')

export default function TagsNew(props) {
    log.verbs('--- Start function TagsNew')
    const { toLog } = useContext(Context)

    const myInputRef = useRef()
    const [errorResult, setErrorResult] = useState({ error: null, json: null })
    log.debug('Start errorResult =', errorResult)
    // log.verbs('--- Start Render TagsNew')

    log.debug('props.wrapper =', props.wrapper)
    const wrapper = props.wrapper ?? false
    log.debug('wrapper =', wrapper)

    const buttonType = props.buttonType ?? 'contained'

    // TODO обработка ошибок проверить / сейчас двойная обработка
    // возмоно оставить зеленое сообщение
    // они так же показываются на экране новой ссылки!

    const main = (
        <>
            <div>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        size='small'
                        // fullWidth
                        // required
                        label='Tag'
                        name='tag'
                        id='inp-tag'
                        // margin='dense'
                        inputRef={myInputRef}
                        sx={{ width: '100%' }}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') Send()
                            if (e.key === 'Escape') {
                                e.target.value = ''
                                props.setFilter('')
                            }
                        }}
                        onChange={(e) => {
                            props.setFilter(e.target.value)
                        }}
                    />
                    <Button
                        variant={buttonType}
                        // sx={{ flexShrink: 0 }}
                        onClick={(e) => {
                            myInputRef.current.value = ''
                            props.setFilter('')
                        }}
                    >
                        &#10006;
                    </Button>
                    <Button
                        variant={buttonType}
                        endIcon={<AddIcon />}
                        // sx={{ minWidth: '100%', mt: 1 }}
                        sx={{ flexShrink: 0 }}
                        onClick={Send}
                    >
                        New Tag
                    </Button>
                </Box>
            </div>
            <AlertInfo errorResult={errorResult} goodMessage='New tag added.' />
        </>
    )
    if (wrapper) {
        return (
            <Paper variant='outlined' sx={{ m: 2, boxShadow: 3, p: 3 }}>
                <Typography variant='h3'>Create a new tag</Typography>
                {main}
            </Paper>
        )
    } else {
        return <div>{main}</div>
    }

    async function Send() {
        log.verbs('--- Start function Send')
        const newTag = [{ title: myInputRef.current.value }]
        myFetch_new(newTag, 'tags', 'POST').then((result) => {
            log.debug('myFetch result', result)
            setErrorResult(result)
            toLog(result.error)
            props.setForceRerender(myInputRef.current.value)
            myInputRef.current.value = ''
        })

        log.verbs('--- Exit function Send')
    }
}
