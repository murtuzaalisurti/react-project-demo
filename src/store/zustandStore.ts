import { nanoid } from "nanoid";
import { create } from "zustand";

interface ITodo {
    id: string,
    title: string,
    desc: string,
    done: boolean
}

interface ITodoActions {
    addTodo: (todo: ITodo) => void,
    removeTodo: (id: string) => void,
    getTodo: (id: string) => ITodo
}

interface ITodoStore extends ITodoActions {
    todos: ITodo[]
}

export const useStore = create<ITodoStore>((set, get) => ({
    todos: [{
        id: nanoid(3),
        title: "Todo1",
        desc: "Desc",
        done: false
    }],
    addTodo: (todo) => set(state => ({
        todos: [
            ...state.todos,
            todo
        ]
    })),
    removeTodo: (id) => set(state => {
        return {
            todos: state.todos.filter(todo => id !== todo.id)
        }
    }),
    getTodo: (id) => {
        return get().todos.filter(todo => todo.id === id)[0]
    }
}))