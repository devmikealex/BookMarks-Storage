import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import Brightness4Icon from '@mui/icons-material/Brightness4'
import DatasetLinkedOutlinedIcon from '@mui/icons-material/DatasetLinkedOutlined'
import SellOutlinedIcon from '@mui/icons-material/SellOutlined'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'

import './Appbar.css'
import {
    styled,
    alpha,
    InputBase,
    createTheme,
    ThemeProvider,
    Switch,
} from '@mui/material'

import { Link as RRLink } from 'react-router-dom'
import { useState } from 'react'
import SearchField from './SearchField'

const themeDark = createTheme({
    palette: {
        mode: 'dark',
        action: {
            hoverOpacity: '0.15',
        },
    },
})
const themeLight = createTheme({
    palette: {
        mode: 'light',
        action: {
            hoverOpacity: '0.15',
        },
    },
})

export default function Appbar(props) {
    return (
        <ThemeProvider theme={props.darkMode ? themeDark : themeLight}>
            <AppBar position='sticky' sx={{ alignItems: 'center' }}>
                <Toolbar sx={{ maxWidth: 'lg', width: '100%', gap: '8px' }}>
                    <Button
                        component={RRLink}
                        to='/'
                        sx={{ borderRadius: 10, padding: 1, minWidth: 0 }}
                        color='inherit'
                    >
                        <CollectionsBookmarkIcon />
                    </Button>

                    <Typography variant='h6' component='div'>
                        BookMarks
                    </Typography>

                    <SearchField />

                    {/* <Typography sx={{ flexGrow: 1 }}> </Typography> */}

                    <Button component={RRLink} to='/links/new' color='inherit'>
                        <AddIcon />
                        Link
                    </Button>
                    {/* <Button component={RRLink} to='/tags/new' color='inherit'>
                        <AddIcon />
                        Tag
                    </Button> */}
                    <Button component={RRLink} to='/links' color='inherit'>
                        <DatasetLinkedOutlinedIcon fontSize='small' sx={{ mr: 0.5 }} />
                        Links
                    </Button>
                    <Button component={RRLink} to='/tags' color='inherit'>
                        <SellOutlinedIcon fontSize='small' sx={{ mr: 0.5 }} />
                        Tags
                    </Button>
                    <Brightness4Icon fontSize='small' sx={{ mr: -0.75 }} />
                    <Switch
                        color='default'
                        size='small'
                        onChange={() => {
                            props.setDarkMode(!props.darkMode)
                        }}
                    />
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}
