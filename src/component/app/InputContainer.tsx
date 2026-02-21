import { useState } from 'react';
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
    const [isComposing, setIsComposing] = useState(false);

    const handleChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isComposing) {
            onAddTodoList();
        }
    };
    return (
        <div className="input-container">
            <input
                className="input-field"
                onKeyDown={handleKeyDown}
                onChange={handleChangeTodo}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
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
