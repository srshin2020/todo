import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  return (
    <div className="app-container">
      <h1 className="app-title">TODO LIST</h1>
      <div className="todo-container">
        <input className="todo-input" onKeyDown={handleKeyDown} onChange={handleChangeTodo} value={todo} type="text" placeholder="Add a new todo" />
        <button className="todo-button" onClick={handleAddTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li className="todo-item" key={todo}>{todo}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
