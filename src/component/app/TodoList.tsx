import type { Todo } from '../../type/Todo';
import './TodoList.css';
import TodoTitle from './todoList/TodoTitle';

export default function TodoList({
    todoList,
    handleDelete,
    handleCheck,
    handleEdit,
}: {
    todoList: Todo[];
    handleDelete: (id: number) => void;
    handleCheck: (id: number) => void;
    handleEdit: (id: number, text: string) => void;
}) {
    return (
        <ul className="todo-list">
            {todoList.map((todo) => (
                <li className="todo-item" key={todo.id}>
                    <input
                        onChange={() => handleCheck(todo.id)}
                        className="todo-checkbox"
                        type="checkbox"
                        checked={todo.completed}
                    />
                    <TodoTitle todo={todo} handleEdit={handleEdit} />
                    <button
                        className="todo-delete-button"
                        onClick={() => handleDelete(todo.id)}
                    >
                        Del
                    </button>
                </li>
            ))}
        </ul>
    );
}
