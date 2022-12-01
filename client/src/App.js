import { Link, Route, Routes } from 'react-router-dom'

import './App.css'
import NavbarLay from './layouts/NavbarLay'
import Links from './pages/Links'
import Main from './pages/Main'
import New from './pages/New'
import NotFound from './pages/NotFound'
import Search from './pages/Search'
import Tags from './pages/Tags'
import TagsNew from './pages/TagsNew'
import TestRoutes from './routes/TestRoutes'

import pages from './pages/pages.json'
console.log(pages)
function App() {
    return (
        <div className='App'>
            <h2>
                App {process.env.REACT_APP_NAME} {process.env.NODE_ENV}
            </h2>
            <Routes>
                {/* <Routes location={'/link2'}> */}
                <Route path='/link1' element={<h3>-TEST section 1-</h3>} />
                <Route path='/link2' element={<h3>-TEST section 2-</h3>} />
                <Route path='/link3' element={<h3>-TEST section 3-</h3>} />
                <Route path='*' element='' />
            </Routes>
            <nav>
                <Link to='/new' state={{ data: 'Test sate data' }}>
                    Test to new
                </Link>
                <ul>
                    {pages.map((page) => {
                        return (
                            <li key={page.title}>
                                <Link to={page.link}>{page.title}</Link>
                            </li>
                        )
                    })}
                    {/* <li>
                        <Link to='/'>Main</Link>
                    </li>
                    <li>
                        <Link to='/new'>New</Link>
                    </li>
                    <li>
                        <Link to='/search'>Search</Link>
                    </li>
                    <li>
                        <Link to='/tags'>Tags</Link>
                    </li>
                    <li>
                        <Link to='/links'>Links</Link>
                    </li> */}
                </ul>
            </nav>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/new' element={<New />} />
                <Route path='/search' element={<Search />} />

                <Route path='/tags' element={<Tags />} />
                <Route path='/tags/new' element={<TagsNew />} />
                <Route path='/tags/:id' element={<Tags />} />

                <Route path='/links' element={<NavbarLay />}>
                    <Route index element={<Links />} />
                    <Route path=':id' element={<Links />} />
                </Route>

                <Route path='*' element={<NotFound />} />

                <Route path='/test' element={<h1>-TEST-</h1>} />
                <Route path='/test-routes/*' element={<TestRoutes />} />
            </Routes>
        </div>
    )
}

export default App
