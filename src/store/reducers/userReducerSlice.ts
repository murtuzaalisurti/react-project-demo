import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../async/fetchUsers";

interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}

interface IUsersState {
    status: "LOADING" | "SUCCESS",
    error: string | null,
    users: User[]
}

const initialState: IUsersState = {
    status: "LOADING",
    error: null,
    users: []
}

const userReducerSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.status = "LOADING"
            state.error = null
        })
        builder.addCase(fetchUsers.fulfilled, (state, actions) => {
            state.users.push(...actions.payload)
            state.status = "SUCCESS"
        })
        builder.addCase(fetchUsers.rejected, (state, actions) => {
            actions.payload && (state.error = actions.error.toString())
            state.status = "LOADING"
        })
    }
})

export default userReducerSlice.reducer