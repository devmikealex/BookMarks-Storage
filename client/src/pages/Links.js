import { useOutletContext, useParams } from 'react-router-dom'

export default function Links() {
    const { id } = useParams()
    const obj = useOutletContext()
    return (
        <>
            <h1>Links ID={id}</h1>
            <h3>DATA={obj.data}</h3>
        </>
    )
}
