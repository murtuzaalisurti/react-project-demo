import { useStore } from "../../store/zustandStore"

const useTodoStore = () => {
    const todoStore = useStore()
    return todoStore
}

export default useTodoStore