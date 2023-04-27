import { createSlice } from "@reduxjs/toolkit";

const foodItemReducerSlice = createSlice({
    name: "food",
    initialState: {
        items: [
            {
                id: 1,
                item: "food item 1"
            },
            {
                id: 2,
                item: "food item 2"
            }
        ]
    },
    reducers: {
        add: (state) => {
            state.items.push({
                id: state.items.length !== 0 ? state.items[state.items.length - 1].id + 1 : 1,
                item: state.items.length !== 0 ? `food item ${state.items[state.items.length - 1].id + 1}` : `food item 1`
            })
        },
        removeLast: (state) => {
            state.items.pop()
        },
        removeFirst: (state) => {
            state.items.shift()
        },
        reset: (state) => {
            state.items = [
                {
                    id: 1,
                    item: "food item 1"
                },
                {
                    id: 2,
                    item: "food item 2"
                }
            ]
        }
    }
})

export const {add, removeFirst, removeLast, reset} = foodItemReducerSlice.actions;
export default foodItemReducerSlice.reducer;