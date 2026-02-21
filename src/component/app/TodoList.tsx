import type { Todo } from '../../type/Todo';
import './TodoList.css';

export default function TodoList({
    todoList,
    handleDelete,
    handleCheck,
}: {
    todoList: Todo[];
    handleDelete: (index: number) => void;
    handleCheck: (index: number) => void;
}) {
    return (
        <ul className="todo-list">
            {todoList.map((todo) => (
                <li className="todo-item" key={todo.id}>
                    <input
                        onChange={() => handleCheck(todo.id)}
                        className="todo-checkbox"
                        type="checkbox"
                    />
                    <div
                        className={`todo-title${todo.completed ? ' completed' : ''}`}
                    >
                        {todo.text}
                    </div>
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
