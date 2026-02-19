import { useState } from 'react';
import './App.css';
import InputContainer from './app/InputContainer';
import TodoList from './app/TodoList';
import AppTitle from './app/AppTitle';

export default function App() {
    const [todoList, setTodoList] = useState<string[]>([]);
    const [todo, setTodo] = useState('');

    const handleAddTodoList = () => {
        setTodoList([...todoList, todo]);
        setTodo('');
    };
    return (
        <div className="app-container">
            <AppTitle />
            <TodoList todos={todoList} />
            <InputContainer
                onAddTodoList={handleAddTodoList}
                setTodo={setTodo}
                todo={todo}
            />
        </div>
    );
}
