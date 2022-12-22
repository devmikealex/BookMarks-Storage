import { Button, Paper, TextField, Typography } from '@mui/material'
import WebLogger from 'mylogger/web-version'
import { useContext, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Context from '../common/context'
import { myFetch_new } from '../common/fetch'
import Link from '../components/Link'

const log = new WebLogger(null, 'SEARCH', 'blue')

export default function Search(props) {
    const { toLog } = useContext(Context)

    const [q, setQ] = useSearchParams({ q: 'Кинопоиск' })

    const [links, setLinks] = useState([])

    return (
        <>
            <Paper variant='outlined' sx={{ p: 2 }}>
                <Typography variant='h4' sx={{ mb: 1 }}>
                    Search {!!links.length && links.length}
                </Typography>
                <TextField
                    size='small'
                    fullWidth
                    label='Search'
                    name='search'
                    id='inp-search'
                    margin='dense'
                    value={q.get('q')}
                    onChange={(e) => {
                        setQ({ q: e.target.value })
                        // search(q.get('q'))
                    }}
                    onKeyUp={(e) => {
                        // if (e.key === 'Enter') search(q.get('q'))
                    }}
                />
                <Button
                    variant='contained'
                    fullWidth
                    onClick={(e) => {
                        searchIndex(q.get('q'))
                    }}
                >
                    Search in index
                </Button>
                <Button
                    variant='contained'
                    fullWidth
                    onClick={(e) => {
                        searchRegExp(q.get('q'))
                    }}
                >
                    Search RegExp
                </Button>
            </Paper>
            {links && (
                <>
                    {links.map((item) => {
                        return <Link item={item} key={item._id} score={item.score} />
                    })}
                </>
            )}
        </>
    )

    async function searchIndex(search) {
        const obj = [{ $text: { $search: search } }, { score: { $meta: 'textScore' } }]
        const res = await myFetch_new(obj, 'links/filters?sfield=score', 'POST')
        log.debug('---------myFetch result', res)
        // toLog(res.error)
        const { errorFetch, json: links } = res
        toLog(errorFetch)
        setLinks(links)
        // console.log('🚀 ~ file: Search.js:63 ~ search ~ errorFetch', errorFetch)
        // console.log('🚀 ~ file: Search.js:63 ~ search ~ links', links)
    }

    async function searchRegExp(search) {
        const obj = {
            $or: [
                { title: new RegExp(search, 'gi') },
                { description: new RegExp(search, 'gi') },
            ],
        }
        const res = await myFetch_new(obj, 'links/filters', 'POST')
        log.debug('---------myFetch result', res)
        const { errorFetch, json: links } = res
        toLog(errorFetch)
        setLinks(links)
    }
}
