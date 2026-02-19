import './TodoList.css';

function TodoList({ todos }: { todos: string[] }) {
    return (
        <ul className="todo-list">
            {todos.map((todo, index) => (
                <li className="todo-item" key={index}>
                    {todo}
                </li>
            ))}
        </ul>
    );
}

export default TodoList;
