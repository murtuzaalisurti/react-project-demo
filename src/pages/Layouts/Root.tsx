import { CssBaseline, Link, ThemeProvider } from "@mui/material"
import { useContext } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { ThemeContext } from "../../context/themeContext"

const Root = () => {
    const { MUITheme } = useContext(ThemeContext);
    return (
        <ThemeProvider theme={MUITheme}>
            <CssBaseline />
            <header>
                <Link href="/">Home</Link>
                <Link href="/axios">Axios</Link>
                <Link href={"/formik"}>Formik</Link>
                <Link href={"/rhf"}>React Hook Form</Link>
                <Link href={"/mui"}>MUI</Link>
                <Link href={"/renderProp"}>Render Prop</Link>
                <Link href={"/nested"}>Nested</Link>
                <Link href={"/nested/nestedTwo"}>Nested Level Two</Link>
            </header>
            <main>
                <Outlet />
            </main>
        </ThemeProvider>
    )
}

export default Root