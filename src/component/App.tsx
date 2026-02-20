import { useMemo, useState } from 'react';
import './App.css';
import InputContainer from './app/InputContainer';
import TodoList from './app/TodoList';
import AppTitle from './app/AppTitle';
import SearchBar from './app/SearchBar';

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export default function App() {
    // todoList 상태 관리
    const [todoList, setTodoList] = useState<Todo[]>([]);
    // todoText 상태 관리
    const [todoText, setTodoText] = useState<string>('');
    // searchText 상태 관리
    const [searchText, setSearchText] = useState<string>('');

    // ✅ 필터링된 리스트는 계산된 값 (useMemo로 최적화)
    const filteredTodoList = useMemo(() => {
        if (!searchText) {
            return todoList; // 검색어가 없으면 전체 리스트
        }
        return todoList.filter((todo) =>
            todo.text.toLowerCase().includes(searchText.toLowerCase()),
        );
    }, [todoList, searchText]); // todoList나 searchTerm이 변경될 때만 재계산

    const addTodo = () => {
        if (!todoText.trim()) return;
        // todoList에 추가
        setTodoList((prevTodos: Todo[]) => [
            ...prevTodos,
            {
                id: todoList.length + 1,
                text: todoText,
                completed: false,
            },
        ]);
        // todoText 초기화
        setTodoText('');
    };

    const deleteTodo = (id: number) => {
        // todoList에서 해당 id의 todo를 제거
        setTodoList((prevTodos: Todo[]) =>
            prevTodos.filter((todo) => todo.id !== id),
        );
    };

    const toggleTodo = (id: number) => {
        // todoList에서 해당 id의 todo를 찾아서 completed 값을 반전시킴
        setTodoList((prevTodos: Todo[]) => {
            const newTodoList = prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            );
            console.log(newTodoList);
            return newTodoList;
        });
    };

    return (
        <div className="app-container">
            <AppTitle />
            <SearchBar searchTerm={searchText} setSearchTerm={setSearchText} />
            <TodoList
                todoList={filteredTodoList}
                handleDelete={deleteTodo}
                handleCheck={toggleTodo}
            />
            <InputContainer
                onAddTodoList={addTodo}
                setTodo={setTodoText}
                todo={todoText}
            />
        </div>
    );
}
