import { useFilteredTodos } from "../context/useFilteredTodos";
import useStore from "../store/useStore";

export const Tasks = () => {
  const { toggleTodo } = useStore();
  const { filteredTodos } = useFilteredTodos();

  return (
    <section>
      {filteredTodos.map((todo) => (
        <div key={todo.id} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={todo.isDone}
            className="mr-2"
            onChange={() => toggleTodo(todo.id)}
          />
          <span className={todo.isDone ? "line-through" : ""}>{todo.name}</span>
        </div>
      ))}
    </section>
  );
};
