import { useState } from 'react';
import type { Todo } from '../../../type/Todo';
import './TodoTitle.css';

export default function TodoTitle({
    todo,
    handleEdit,
}: {
    todo: Todo;
    handleEdit: (id: number, text: string) => void;
}) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState<string>('');

    const stopEdit = (id: number, text: string) => {
        setEditingId(null);
        handleEdit(id, text);
    };

    // 수정 버튼 클릭 시 수정 모달 창 띄우기
    const startEdit = (id: number) => {
        setEditingId(id);
        setEditingText(todo.text);
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

    return editingId === todo.id ? (
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
    );
}
