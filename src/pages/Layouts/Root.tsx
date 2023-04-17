import { CssBaseline, ThemeProvider } from "@mui/material"
import { useContext } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { ThemeContext } from "../../context/themeContext"

const Root = () => {
    const { MUITheme } = useContext(ThemeContext);
    return (
        <ThemeProvider theme={MUITheme}>
            <CssBaseline />
            <header>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/formik"}>Formik</NavLink>
                <NavLink to={"/rhf"}>React Hook Form</NavLink>
                <NavLink to={"mui"}>MUI</NavLink>
                <NavLink to={"/renderProp"}>Render Prop</NavLink>
                <NavLink to={"nested"}>Nested</NavLink>
                <NavLink to={"/nested/nestedTwo"}>Nested Level Two</NavLink>
            </header>
            <main>
                <Outlet />
            </main>
        </ThemeProvider>
    )
}

export default Root