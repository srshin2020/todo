import './TodoList.css';

export default function TodoList({
    todos,
    handleDelete,
}: {
    todos: string[];
    handleDelete: (index: number) => void;
}) {
    return (
        <ul className="todo-list">
            {todos.map((todo, index) => (
                <li className="todo-item" key={index}>
                    <div className="todo-title">{todo}</div>
                    <button
                        className="todo-delete-button"
                        onClick={() => handleDelete(index)}
                    >
                        삭제
                    </button>
                </li>
            ))}
        </ul>
    );
}
