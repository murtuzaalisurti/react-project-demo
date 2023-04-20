import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Link } from "@mui/material"
import { Outlet, useLocation } from "react-router-dom"

const Nested = () => {
  const location = useLocation();
  const relativePath = location.pathname.split("/").slice(1).join("/")
  
  return (
    <div>
      Nested Route
      <Breadcrumbs separator={<NavigateNext />}>
        <Link underline="hover" href="/nested" color={relativePath === "nested" ? "text.primary" : "inherit"} aria-current={relativePath === "nested" ? "page" : "false"}>Nested</Link>
        <Link underline="hover" href={"/nested/nestedTwo"} color={relativePath === "nested/nestedTwo" ? "text.primary" : "inherit"} aria-current={relativePath === "nested/nestedTwo" ? "page" : "false"}>Level Two</Link>
      </Breadcrumbs>
      <Outlet />
    </div>
  )
}

export default Nested