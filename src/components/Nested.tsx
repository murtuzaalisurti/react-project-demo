import { Link, Outlet } from "react-router-dom"

const Nested = () => {
  return (
    <div>
        Nested Route
        <Link to={"nestedTwo"}>Level Two</Link>
        <Outlet />
    </div>
  )
}

export default Nested