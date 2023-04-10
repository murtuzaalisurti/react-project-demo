import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react"
import { TodoContext } from "../context/todoContext"
import { nanoid } from "nanoid"

interface IFormData {
  id: string,
  title: string,
  desc: string,
  done: boolean
}

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { todos, addTodo } = useContext(TodoContext)
  const [formData, setFormData] = useState<IFormData>({
    id: "",
    title: "",
    desc: "",
    done: false
  })

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement

    setFormData((prevData: IFormData) => {
      return {
        ...prevData,
        id: nanoid(3),
        [target.id]: target.id === "done" ? target.checked : target.value
      }
    })
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <p>Title: {todo.title}</p>
          <p>Desc: {todo.desc}</p>
          <p>Done: {todo.done.toString()}</p>
        </div>
      ))}
      <form>
        <input ref={inputRef} id="title" onChange={handleChange} type="text" placeholder="title" value={formData.title} />
        <input id="desc" onChange={handleChange} type="text" placeholder="desc" value={formData.desc} />
        {/* <input type="checkbox" id="done" onChange={handleChange} checked={formData.done} /> */}
      </form>
      <button onClick={() => addTodo(formData)} disabled={formData.title === "" || formData.desc === ""}>Add todo</button>
    </div>
  )
}

export default Home