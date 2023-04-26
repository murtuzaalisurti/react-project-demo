import { useStore } from "../../store/zustandStore"

const useTodoStore = () => {
    return useStore(state => state)
}

export default useTodoStore