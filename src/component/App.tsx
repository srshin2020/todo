import { useMemo, useState } from 'react';
import './App.css';
import InputContainer from './app/InputContainer';
import TodoList from './app/TodoList';
import AppTitle from './app/AppTitle';
import SearchBar from './app/SearchBar';

export default function App() {
    const [todoList, setTodoList] = useState<string[]>([]);
    const [todo, setTodo] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // ✅ 필터링된 리스트는 계산된 값 (useMemo로 최적화)
    const filteredTodoList = useMemo(() => {
        if (!searchTerm) {
            return todoList; // 검색어가 없으면 전체 리스트
        }
        return todoList.filter((todo) =>
            todo.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [todoList, searchTerm]); // todoList나 searchTerm이 변경될 때만 재계산

    const handleAddTodoList = () => {
        setTodoList([...todoList, todo]);
        setTodo('');
    };

    return (
        <div className="app-container">
            <AppTitle />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <TodoList todos={filteredTodoList} />
            <InputContainer
                onAddTodoList={handleAddTodoList}
                setTodo={setTodo}
                todo={todo}
            />
        </div>
    );
}
