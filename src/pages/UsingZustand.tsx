import { Button, Typography } from "@mui/material"
import { useStore } from "../store/zustandStore"
import useTodoStore from "../components/hooks/useTodoStore"
import { nanoid } from "nanoid"
import { useState } from "react"

const UsingZustand = () => {
    // const { todos, addTodo, removeTodo, getTodo } = useStore(state => state)
    const { todos, addTodo, getTodo, removeTodo } = useTodoStore()

    console.log(getTodo(todos[Math.floor(Math.random() * todos.length)].id));

    return (
        <>
            {todos.constructor === Array && todos.map((todo) => {
                return (
                    <Typography key={todo.id} component={"pre"}>{JSON.stringify(todo, null, 4)}</Typography>
                )
            })}
            <Button variant="contained" onClick={() => addTodo({
                id: nanoid(3),
                title: "Todo added",
                desc: "added",
                done: false
            })}>Add Todo</Button>

            <Button onClick={() => removeTodo(todos[Math.floor(Math.random() * todos.length)].id)}>Remove Todo</Button>

            {/* <Typography component={"pre"}>Random Todo: {JSON.stringify(todos.find(todo => todo.id === todos[Math.floor(Math.random() * todos.length)].id), null, 4)}</Typography> */}
            <Typography component={"pre"}>{`Random Todo using get() ${JSON.stringify(getTodo(todos[Math.floor(Math.random() * todos.length)].id), null, 4)}`}</Typography>
        </>
    )
}

export default UsingZustand