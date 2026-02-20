import type { Todo } from '../App';
import './TodoCount.css';

export default function TodoCount({ todoList }: { todoList: Todo[] }) {
    return (
        <div className="todo-count">
            <span>all: {todoList.length}</span>
            <span>
                completed: {todoList.filter((todo) => todo.completed).length}
            </span>
            <span>
                not completed:{' '}
                {todoList.filter((todo) => !todo.completed).length}
            </span>
        </div>
    );
}
