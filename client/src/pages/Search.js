import { Button } from '@mui/material'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import Context from '../common/context'

export default function Search(props) {
    const logFunc = useContext(Context)

    const [q, setQ] = useSearchParams({ q: 'text' })
    console.log('🚀 ~ file: Search.js:5 ~ Search ~ q', q.get('q'))

    return (
        <>
            <h1>Search</h1>
            <Button onClick={() => logFunc.toLog('aaaaaaaaaaaaaa')}>Test Context</Button>
            <br />
            <input
                type='text'
                value={q.get('q')}
                onInput={(e) => {
                    setQ({ q: e.target.value })
                }}
            />
        </>
    )
}
