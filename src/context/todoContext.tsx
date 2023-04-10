import { ReactNode, createContext, useState } from "react";
import { nanoid } from "nanoid";

interface ITodo {
    id: string
    title: string,
    desc: string,
    done: boolean
}

interface ITodoContextProviderProps {
    children: ReactNode
}

interface ITodoContext {
    todos: ITodo[],
    addTodo: (todo: ITodo) => void
}

const initialContext: ITodoContext = {
    todos: [{
        id: nanoid(3),
        title: "Todo1",
        desc: "Desc",
        done: false
    }],
    addTodo: (todo: ITodo) => {}
}

const setContext = () => {
    const [todos, setTodos] = useState<ITodo[]>(initialContext.todos);

    const addTodo = (todo: ITodo) => {
        setTodos((prev: ITodo[]) => {
            return [
                ...prev,
                todo
            ]
        })
    }

    return { todos, addTodo }

}

export const TodoContext = createContext(initialContext)

export const TodoContextProvider = ({ children }: ITodoContextProviderProps) => {
    const todoItems = setContext()
    return (
        <TodoContext.Provider value={todoItems}>
            {children}
        </TodoContext.Provider>
    )
}
