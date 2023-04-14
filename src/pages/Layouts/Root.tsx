import { NavLink, Outlet } from "react-router-dom"

const Root = () => {
    return (
        <>
            <header>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/formik"}>Formik</NavLink>
                <NavLink to={"/rhf"}>React Hook Form</NavLink>
                <NavLink to={"/renderProp"}>Render Prop</NavLink>
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