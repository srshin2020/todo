import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import './App.css'


function InputHeader({ onAddTodo, setTodo, todo }: { onAddTodo: () => void, setTodo: (todo: string) => void, todo: string }) {

  const handleChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAddTodo()
    }
  }
  return (
    <div className="todo-container">
      <input className="todo-input" onKeyDown={handleKeyDown} onChange={handleChangeTodo} value={todo} type="text" placeholder="Add a new todo" />
      <button className="todo-button" onClick={onAddTodo}>Add</button>
    </div>
  )
}

function TodoList({ todos }: { todos: string[] }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li className="todo-item" key={todo}>{todo}</li>
      ))}
    </ul>
  )
}

function App() {
  const [todos, setTodos] = useState<string[]>([])
  const [todo, setTodo] = useState('')

  const handleAddTodo = () => {
    setTodos([...todos, todo])
    setTodo('')
  }
  return (
    <div className="app-container">
      <h1 className="app-title">TODO LIST</h1>
      <InputHeader onAddTodo={handleAddTodo} setTodo={setTodo} todo={todo} />

      <TodoList todos={todos} />
    </div>
  )
}

export default App
