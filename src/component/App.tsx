import { useMemo, useState } from 'react';
import './App.css';
import InputContainer from './app/InputContainer';
import TodoList from './app/TodoList';
import AppTitle from './app/AppTitle';
import SearchBar from './app/SearchBar';
import TodoCount from './app/TodoCount';
import type { Todo } from '../type/Todo';
import { idGenerator } from '../util/IdGenerator';

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

    // 추가 버튼 클릭 시 todoList에 추가
    const addTodo = () => {
        if (!todoText.trim()) return;
        const newId = idGenerator.generateId();
        // todoList에 추가
        setTodoList((prevTodos: Todo[]) => {
            const newTodoList = [
                ...prevTodos,
                {
                    id: newId,
                    text: todoText,
                    completed: false,
                },
            ];
            console.log(newTodoList);
            return newTodoList;
        });
        // todoText 초기화
        setTodoText('');
    };

    // 정렬 버튼 클릭 시 todoList를 정렬
    const sortBy = (sortBy: string) => {
        setTodoList((prevTodos: Todo[]) => {
            // 원본 배열을 복사하여 정렬
            // [...prevTodos] 배열을 복사하여 정렬
            const sortedTodos = [...prevTodos].sort((a, b) => {
                if (sortBy === 'asc') {
                    return a.text.localeCompare(b.text);
                } else {
                    return b.text.localeCompare(a.text);
                }
            });
            return sortedTodos;
        });
    };

    // 삭제 버튼 클릭 시 todoList에서 해당 id의 todo를 제거
    const deleteTodo = (id: number) => {
        // todoList에서 해당 id의 todo를 제거
        setTodoList((prevTodos: Todo[]) =>
            prevTodos.filter((todo) => todo.id !== id),
        );
    };

    // 체크박스 클릭 시 completed 값을 반전시킴
    const toggleTodo = (id: number) => {
        // todoList에서 해당 id의 todo를 찾아서 completed 값을 반전시킴
        setTodoList((prevTodos: Todo[]) => {
            const newTodoList = prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            );
            return newTodoList;
        });
    };

    // 수정 버튼 클릭 시 수정 input 창 띄우기
    const editTodo = (id: number, text: string) => {
        setTodoList((prevTodos: Todo[]) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, text: text } : todo,
            ),
        );
    };

    return (
        <div className="app-container">
            <AppTitle />
            <TodoCount todoList={todoList} />
            <SearchBar
                searchText={searchText}
                setSearchText={setSearchText}
                sortBy={sortBy}
            />
            <TodoList
                todoList={filteredTodoList}
                handleDelete={deleteTodo}
                handleCheck={toggleTodo}
                handleEdit={editTodo}
            />
            <InputContainer
                onAddTodoList={addTodo}
                setTodo={setTodoText}
                todo={todoText}
            />
        </div>
    );
}
