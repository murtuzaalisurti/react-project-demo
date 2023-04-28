import { configureStore } from '@reduxjs/toolkit'
import foodItemReducerSlice from './reducers/foodItemReducerSlice'
import userReducerSlice from './reducers/userReducerSlice'

const store = configureStore({
    reducer: {
        food: foodItemReducerSlice,
        users: userReducerSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch