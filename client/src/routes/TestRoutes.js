import { Route, Routes } from 'react-router-dom'

export default function TestRoutes() {
    return (
        <>
            <h1>-Test-Routes-</h1>
            <h3>test test test</h3>
            <Routes>
                <Route index element={<h1>-TEST 11-</h1>} />
                <Route path=':id' element={<h1>-TEST 22-</h1>} />
            </Routes>
        </>
    )
}
