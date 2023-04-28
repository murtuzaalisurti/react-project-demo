import { createAsyncThunk, AsyncThunkOptions } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../config";

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

interface userListParams {
    _limit: number
}

const createPreTypedAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState,
    dispatch: AppDispatch,
    rejectValue: {
        message: string
    }
}>()

export const fetchUsers = createPreTypedAsyncThunk<
    User[],
    userListParams
>("users/fetch",
    async (params: userListParams, thunkAPI) => {
        params && console.log(Object.keys(params))
        
        const endpoint = params ? `https://jsonplaceholder.typicode.com/users?_limit=${params._limit}` : 'https://jsonplaceholder.typicode.com/users';
        const res = await fetch(endpoint)

        if(res.status !== 200) {
            return thunkAPI.rejectWithValue({
                message: "Failed to fetch"
            })
        }

        const data: User[] = await res.json()
        return data
    }
)