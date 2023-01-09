import { styled, alpha, InputBase, ListItemButton, Divider, List } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useContext, useState } from 'react'
import serialize from 'serialize-javascript'
import { myFetch_new } from '../common/fetch'
import WebLogger from 'mylogger/web-version'
import Context from '../common/context'
import { useNavigate } from 'react-router-dom'
import LinkShort from '../components/LinkShort'

const log = new WebLogger(null, 'SEARCHFAST', 'blue')

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        // transition: theme.transitions.create('width'),
        width: '100%',
        // [theme.breakpoints.up('sm')]: {
        // width: '14ch',
        // width: '12ch',
        // '&:focus': {
        //     width: '20ch',
        // },
        // },
    },
}))

export default function SearchField() {
    log.verbs('--- Start function -SearchField-')

    const { toLog } = useContext(Context)

    const [searchString, setSearchString] = useState('')
    log.debug('searchString =', searchString)

    const [links, setLinks] = useState(null)
    log.debug('links =', links)

    const [isFocused, setIsFocused] = useState(false)
    log.debug('isFocused =', isFocused)

    const navigate = useNavigate()

    async function fastSearch(search = searchString) {
        if (search.length <= 2) {
            setLinks(null)
            return
        }
        const obj1 = {
            $or: [
                { title: new RegExp(search, 'gi') },
                { description: new RegExp(search, 'gi') },
                { url: new RegExp(search, 'gi') },
            ],
        }
        const obj2 = { title: 1 }
        const objSer = serialize([obj1, obj2])
        const res = await myFetch_new({ objSer }, 'links/filters', 'POST')
        log.debug('---------myFetch result', res)
        const { errorFetch, json: links } = res
        toLog(errorFetch)
        setLinks(links)
    }
    return (
        <Search sx={{ position: 'relative', flexGrow: 1 }}>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                value={searchString}
                onChange={(e) => {
                    fastSearch(e.target.value)
                    setSearchString(e.target.value)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                        setSearchString('')
                        setLinks(null)
                    }
                }}
                onBlur={() => {
                    setTimeout(() => {
                        setIsFocused(false)
                    }, 200)
                }}
                onFocus={() => {
                    setTimeout(() => {
                        setIsFocused(true)
                    }, 200)
                }}
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
                sx={{ width: '100%' }}
            />
            {links && isFocused && (
                <List
                    sx={{
                        bgcolor: 'background.paper',
                        position: 'absolute',
                        p: 0,
                        borderRadius: 1,
                        width: '100%',
                        // left: '-100px',
                        // width: '500px',
                        // left: '-20vw',
                        // maxWidth: '60vw',
                        boxShadow: 6,
                    }}
                >
                    {links.map((item) => {
                        return (
                            <>
                                <ListItemButton
                                    onClick={() => navigate('/links/' + item._id)}
                                    key={item._id}
                                    sx={{ paddingY: 0.5 }}
                                >
                                    <LinkShort
                                        item={item}
                                        key={item._id}
                                        searchString={searchString}
                                    />
                                </ListItemButton>
                                <Divider />
                            </>
                        )
                    })}
                </List>
            )}
        </Search>
    )
}
