import { useState } from 'react';
import './App.css';
import InputContainer from './app/InputContainer';
import TodoList from './app/TodoList';
import AppTitle from './app/AppTitle';
import SearchBar from './app/SearchBar';

export default function App() {
    const [todoList, setTodoList] = useState<string[]>([]);
    const [filteredTodoList, setFilteredTodoList] = useState<string[]>([]);
    const [todo, setTodo] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddTodoList = () => {
        setTodoList([...todoList, todo]);
        setTodo('');
        setFilteredTodoList([...filteredTodoList, todo]);
    };

    const handleSearch = (searchTerm: string) => {
        setFilteredTodoList(
            todoList.filter((todo) =>
                todo.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        );
    };
    return (
        <div className="app-container">
            <AppTitle />
            <SearchBar
                onSearch={handleSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <TodoList todos={filteredTodoList} />
            <InputContainer
                onAddTodoList={handleAddTodoList}
                setTodo={setTodo}
                todo={todo}
            />
        </div>
    );
}
