import { useLocation } from 'react-router-dom'

export default function New() {
    const loc = useLocation()
    console.log('🚀 ~ file: New.js:5 ~ New ~ loc', loc)
    return <h1>New state={loc.state.data}</h1>
}
