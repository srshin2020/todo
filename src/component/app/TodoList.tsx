import { useState } from 'react';
import type { Todo } from '../../type/Todo';
import './TodoList.css';

export default function TodoList({
    todoList,
    handleDelete,
    handleCheck,
    handleEdit,
}: {
    todoList: Todo[];
    handleDelete: (index: number) => void;
    handleCheck: (index: number) => void;
    handleEdit: (id: number, text: string) => void;
}) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState<string>('');
    // 수정 버튼 클릭 시 수정 모달 창 띄우기
    const startEdit = (id: number) => {
        setEditingId(id);
        setEditingText(todoList.find((todo) => todo.id === id)?.text || '');
    };

    const stopEdit = (id: number, text: string) => {
        console.log('stopEdit', id, text);
        setEditingId(null);
        handleEdit(id, text);
    };

    const handleKeyDown = (
        id: number,
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === 'Enter') {
            stopEdit(id, editingText);
        } else if (e.key === 'Escape') {
            setEditingId(null);
        }
    };
    return (
        <ul className="todo-list">
            {todoList.map((todo) => (
                <li className="todo-item" key={todo.id}>
                    <input
                        onChange={() => handleCheck(todo.id)}
                        className="todo-checkbox"
                        type="checkbox"
                    />
                    {editingId === todo.id ? (
                        <input
                            className="todo-title"
                            type="text"
                            value={editingText}
                            autoFocus
                            onChange={(e) => setEditingText(e.target.value)}
                            onBlur={(e) => stopEdit(todo.id, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(todo.id, e)}
                        />
                    ) : (
                        <div
                            className={`todo-title${todo.completed ? ' completed' : ''}`}
                            onClick={() => startEdit(todo.id)}
                        >
                            {todo.text}
                        </div>
                    )}
                    <button
                        className="todo-delete-button"
                        onClick={() => handleDelete(todo.id)}
                    >
                        삭제
                    </button>
                </li>
            ))}
        </ul>
    );
}
