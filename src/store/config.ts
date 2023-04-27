import { configureStore } from '@reduxjs/toolkit'
import foodItemReducerSlice from './reducers/foodItemReducerSlice'

const store = configureStore({
    reducer: {
        food: foodItemReducerSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch