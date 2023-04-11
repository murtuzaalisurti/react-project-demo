import { NavLink, Outlet } from "react-router-dom"

const Root = () => {
    return (
        <>
            <header>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"nested"}>Nested</NavLink>
                <NavLink to={"/nested/nestedTwo"}>Nested Level Two</NavLink>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Root