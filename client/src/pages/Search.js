import { useSearchParams } from 'react-router-dom'

export default function Search() {
    const [q, setQ] = useSearchParams({ q: 'text' })
    console.log('🚀 ~ file: Search.js:5 ~ Search ~ q', q.get('q'))
    return (
        <>
            <h1>Search</h1>
            <input
                type='text'
                value={q.get('q')}
                onInput={(e) => {
                    setQ({ q: e.target.value })
                }}
            />
        </>
    )
}
