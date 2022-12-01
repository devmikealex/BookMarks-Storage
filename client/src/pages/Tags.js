import { useParams } from 'react-router-dom'

export default function Tags() {
    const { id } = useParams()
    return (
        <>
            <h1>Tags ID={id}</h1>
        </>
    )
}
