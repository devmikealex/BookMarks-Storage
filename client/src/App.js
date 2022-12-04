import { Link, Route, Routes } from 'react-router-dom'
import NavbarLay from './layouts/NavbarLay'
import Links from './pages/Links'
import Main from './pages/Main'
import New from './pages/New'
import NotFound from './pages/NotFound'
import Search from './pages/Search'
import Tags from './pages/Tags'
import TagsNew from './pages/TagsNew'
import './App.css'

import pages from './pages/pages.json'
import WebLogger from 'mylogger/web-version'

const log = new WebLogger(null, ' APP', 'white-Coral')

function App() {
    log.verbs('--- Start Render App')

    return (
        <div className='App'>
            <h2>
                BookMarks Storage - {process.env.REACT_APP_SERVER} -{' '}
                {process.env.NODE_ENV}
            </h2>
            <nav>
                <ul>
                    {pages.map((page) => {
                        return (
                            <li key={page.title}>
                                <Link to={page.link}>{page.title}</Link>
                            </li>
                        )
                    })}
                    <li>-</li>
                    <li>
                        <Link to='/tags/12345'>Tag id 12345</Link>
                    </li>
                    <li>
                        <Link to='/tags/637159841b9f753fa731a5aa'>
                            Tag id 637159841b9f753fa731a5aa
                        </Link>
                    </li>
                    <li>
                        <a href={`${process.env.REACT_APP_SERVER}/tags/createTestTags`}>
                            createTestTags
                        </a>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/search' element={<Search />} />

                <Route path='/tags' element={<Tags />} />
                <Route path='/tags/new' element={<TagsNew />} />
                <Route path='/tags/:id' element={<Tags />} />

                <Route path='/links' element={<NavbarLay />}>
                    <Route index element={<Links />} />
                    <Route path='new' element={<New />} />
                    <Route path=':id' element={<Links />} />
                </Route>

                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default App
