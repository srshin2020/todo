import './TodoList.css';

export default function TodoList({
    todos,
    setTodoList: setTodoList,
}: {
    todos: string[];
    setTodoList: React.Dispatch<React.SetStateAction<string[]>>; // ✅ 수정
}) {
    const handleDelete = (index: number) => {
        setTodoList((prevTodos: string[]) =>
            prevTodos.filter((_, i) => i !== index),
        );
    };
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
