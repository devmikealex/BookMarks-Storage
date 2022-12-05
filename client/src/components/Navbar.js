import './Navbar.css'
import pages from '../pages/pages.json'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav>
            <ul>
                {pages.map((page) => {
                    return (
                        <li key={page.title}>
                            <Link to={page.link}>{page.title}</Link>
                        </li>
                    )
                })}
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
    )
}
