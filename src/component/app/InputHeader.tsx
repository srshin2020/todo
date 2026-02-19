import { type ChangeEvent, type KeyboardEvent } from 'react';
import './InputHeader.css';

function InputHeader({
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
        <div className="todo-container">
            <input
                className="todo-input"
                onKeyDown={handleKeyDown}
                onChange={handleChangeTodo}
                value={todo}
                type="text"
                placeholder="Add a new todo"
            />
            <button className="todo-button" onClick={onAddTodoList}>
                Add
            </button>
        </div>
    );
}

export default InputHeader;
