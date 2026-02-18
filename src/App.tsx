import { type ChangeEvent, useState } from 'react'
import './App.css'

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState<string[]>([])

  const handleAddTodo = () => {
    setTodos([...todos, todo])
    setTodo('')
  }

  const handleChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }

  return (
    <>
      <h1>TODO LIST</h1>
      <input className="todo-input" onChange={handleChangeTodo} value={todo} type="text" placeholder="Add a new todo" />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li className="todo-item" key={todo}>{todo}</li>
        ))}
      </ul>
    </>
  )
}

export default App
