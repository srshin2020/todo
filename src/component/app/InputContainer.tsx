import { type ChangeEvent, type KeyboardEvent } from 'react';
import './InputContainer.css';

export default function InputContainer({
    onAddTodoList,
    setTodo,
    todo,
}: {
    onAddTodoList: () => void;
    setTodo: (todo: string) => void;
    todo: string;
}) {
    const handleChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddTodoList();
        }
    };
    return (
        <div className="input-container">
            <input
                className="input-field"
                onKeyDown={handleKeyDown}
                onChange={handleChangeTodo}
                value={todo}
                type="text"
                placeholder="Add a new todo"
            />
            <button className="input-button" onClick={onAddTodoList}>
                Add
            </button>
        </div>
    );
}
