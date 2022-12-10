import { Link, Route, Routes } from 'react-router-dom'
import NavbarLay from './layouts/NavbarLay'
import Links from './pages/Links'
import Main from './pages/Main'
import New from './pages/New'
import NotFound from './pages/NotFound'
import Search from './pages/Search'
import Tags from './pages/Tags'
import TagsNew from './pages/TagsNew'
import Navbar from './components/Navbar'

import { blue } from '@mui/material/colors'
import { blueGrey } from '@mui/material/colors'

import './App.css'

import WebLogger from 'mylogger/web-version'
import LinksNew from './pages/LinksNew'
import Appbar from './components/Appbar'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { useState } from 'react'

const log = new WebLogger(null, ' APP', 'white-Coral')

function App() {
    log.verbs('--- Start Render App')
    const [darkMode, setDarkMode] = useState(false)

    const themeDark = createTheme({
        palette: {
            mode: 'dark',
            background: {
                default: blueGrey[800],
            },
        },
    })
    const themeLight = createTheme({
        palette: {
            mode: 'light',
            background: {
                default: blue[50],
            },
        },
    })

    return (
        <ThemeProvider theme={darkMode ? themeDark : themeLight}>
            <CssBaseline />
            <div className='App'>
                <Appbar darkMode={darkMode} setDarkMode={setDarkMode} />
                <Container maxWidth='lg' sx={{ mt: 2 }}>
                    <h2>
                        {process.env.REACT_APP_SERVER} - {process.env.NODE_ENV}
                    </h2>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Main />} />
                        <Route path='/search' element={<Search />} />
                        {/* <Route path='/new' element={<New />} /> */}

                        <Route path='/tags' element={<Tags deletable />} />
                        <Route path='/tags/new' element={<TagsNew />} />
                        <Route path='/tags/:id' element={<Tags />} />

                        <Route path='/links' element={<NavbarLay />}>
                            <Route index element={<Links />} />
                            <Route path='new' element={<LinksNew />} />
                            <Route path=':id' element={<Links />} />
                        </Route>

                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </Container>
            </div>
        </ThemeProvider>
    )
}

export default App
