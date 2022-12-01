import { Outlet } from 'react-router-dom'

export default function NavbarLay() {
    return (
        <>
            <div>NavbarLay</div>
            <Outlet context={{ data: 'From Outlet context.' }} />
        </>
    )
}
