import { Typography } from "@mui/material"
import useUsers from "../hooks/useUsers"
import { fetchUsers } from "../store/async/fetchUsers"
import { useEffect } from "react"

const UsersRedux = () => {
    const { users, dispatch, error, status } = useUsers()

    useEffect(() => {
        dispatch(fetchUsers({ _limit: 3 }))
    }, [])

    return (
        <>
            {
                !error ? (status === "LOADING" ? <Typography>{status}</Typography> : <Typography component={"pre"}>{JSON.stringify(users, null, 4)}</Typography>) : (<Typography>{error}</Typography>)
            }

        </>
    )
}

export default UsersRedux