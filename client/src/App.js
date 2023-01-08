import { Route, Routes } from 'react-router-dom'
import NavbarLay from './layouts/NavbarLay'
import Main from './pages/Main'
import Links from './pages/Links'
import LinksEdit from './pages/LinksEdit'
import NotFound from './pages/NotFound'
import Search from './pages/Search'
import Tags from './pages/Tags'
import TagsNew from './pages/TagsNew'
import TagsEdit from './pages/TagsEdit'
import Navbar from './components/Navbar'

import { blue } from '@mui/material/colors'
import { blueGrey } from '@mui/material/colors'

import './App.css'

import WebLogger from 'mylogger/web-version'
import LinksNew from './pages/LinksNew'
import Appbar from './components/Appbar'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { useState } from 'react'
import UploadFiles from './components/UploadFiles'
import InfoLog from './components/InfoLog'
import Context from './common/context'
import AlertModal from './components/AlertModal'
import ImagesModal from './components/ImagesModal'
// import Upload-test from './pages/Upload-test'

const log = new WebLogger(null, ' APP', 'white-Coral')

function App() {
    log.verbs('--- Start Render App')
    const [darkMode, setDarkMode] = useState(false)

    const [history, setHistory] = useState([])
    function toLog(text) {
        // console.log('toLog:', text)
        if (text) {
            const newLine = { time: Date.now(), message: text }
            // history.push(newLine)
            setHistory([newLine, ...history])
            //TODO может сделать принудительный ре-рендер
        }
    }

    const [imagesModalOpen, setImagesModalOpen] = useState(false)
    const [imagesModal, setImagesModal] = useState({})
    function toImagesModal(title, images, image) {
        log.verbs('--- Start function -toImagesModal-')
        setImagesModal({ title, images, image })
        setImagesModalOpen(true)
    }

    const [modalOpen, setModalOpen] = useState(false)
    const [modalInfo, setModalInfo] = useState({})
    /**
     * Показать модальное сообщение
     * @param {string} title Заголовок модального окна
     * @param {string} message Сообщение (тело)
     * @param {function} funcYes Функция для положительного ответа
     * @param {any} args Аргументы для функции
     */
    function toModalAlert(title, message, button, funcYes, args) {
        log.verbs('--- Start function -toModalAlert-')
        log.debug('Title =', title)
        log.debug('Message =', message)
        log.debug('Button =', button)
        log.debug('args =', args)

        setModalInfo({ title, message, button, funcYes, args })
        setModalOpen(true)
        // funcYes(args)
    }

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
        <Context.Provider value={{ toLog, toModalAlert, toImagesModal }}>
            <ThemeProvider theme={darkMode ? themeDark : themeLight}>
                <CssBaseline />
                <div className='App'>
                    <Appbar darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Container maxWidth='lg' sx={{ mt: 2 }}>
                        {/* TODO AlertModal это все еще нужно??? */}
                        <AlertModal
                            open={modalOpen}
                            setModalOpen={setModalOpen}
                            modalInfo={modalInfo}
                        />
                        <ImagesModal
                            open={imagesModalOpen}
                            setImagesModalOpen={setImagesModalOpen}
                            imagesModal={imagesModal}
                        />
                        <InfoLog history={history} />
                        <h2>
                            {/* {process.env.REACT_APP_SERVER} - {process.env.NODE_ENV} */}
                            {process.env.NODE_ENV} - {window.PathToBMServer}
                        </h2>
                        <Navbar />
                        <Routes>
                            <Route path='/' element={<Main />} />
                            <Route path='/search' element={<Search />} />
                            <Route path='/upload' element={<UploadFiles />} />
                            {/* <Route path='/upload2' element={<Upload-test />} /> */}
                            {/* <Route path='/new' element={<New />} /> */}

                            <Route path='/tags' element={<Tags deletable />} />
                            <Route path='/tags/new' element={<TagsNew wrapper />} />
                            <Route path='/tags/:id' element={<Tags />} />
                            <Route path='/tags/edit/:id' element={<TagsEdit />} />

                            <Route path='/links' element={<NavbarLay />}>
                                <Route index element={<Links />} />
                                <Route path='new' element={<LinksNew />} />
                                <Route path=':id' element={<Links />} />
                                <Route path='edit/:id' element={<LinksEdit />} />
                            </Route>

                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </Container>
                </div>
            </ThemeProvider>
        </Context.Provider>
    )
}

export default App
