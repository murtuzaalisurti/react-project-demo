import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../store/config"
import { add, removeFirst, removeLast, reset } from '../store/reducers/foodItemReducerSlice'

const useFoodItems = () => {
    const dispatch = useDispatch()
    const { items } = useSelector((state: RootState) => state.food)
    return {
        items,
        dispatch,
        actions: {
            add,
            removeFirst,
            removeLast,
            reset
        }
    }
}

export default useFoodItems