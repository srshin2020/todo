import { useState } from 'react';
import './App.css';
import InputHeader from './app/InputHeader';
import TodoList from './app/TodoList';

function App() {
    const [todoList, setTodoList] = useState<string[]>([]);
    const [todo, setTodo] = useState('');

    const handleAddTodoList = () => {
        setTodoList([...todoList, todo]);
        setTodo('');
    };
    return (
        <div className="app-container">
            <h1 className="app-title">TODO LIST</h1>
            <InputHeader
                onAddTodoList={handleAddTodoList}
                setTodo={setTodo}
                todo={todo}
            />
            <TodoList todos={todoList} />
        </div>
    );
}

export default App;
