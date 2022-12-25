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
                    <Link to='/tags?sfield=counter&sorder=-1'>Tag sort by count</Link>
                </li>
                <li>
                    <Link to='/tags/12345'>Tag id 12345</Link>
                </li>
                <li>
                    <Link to='/tags/637159841b9f753fa731a5aa'>
                        Tag id 637159841b9f753fa731a5aa
                    </Link>
                </li>
                <li>
                    <Link to='/links/123'>Link id 123</Link>
                </li>
                <li>
                    <Link to='/links/?limit=5&sfield=title&sorder=1'>Link SORT</Link>
                </li>
                <li>
                    <a href={`${process.env.REACT_APP_SERVER}/tags/createTestTags`}>
                        createTestTags
                    </a>
                </li>
                <li>
                    <a href={`${process.env.REACT_APP_SERVER}/tags/counters/sync`}>
                        synccounters
                    </a>
                </li>
            </ul>
        </nav>
    )
}
