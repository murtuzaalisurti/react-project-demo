import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/config"

const useUsers = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { users, error, status } = useSelector((state: RootState) => state.users)
    return {
        users,
        dispatch,
        error,
        status
    }
}

export default useUsers