import { useFilteredTodos } from "../context/useFilteredTodos";
import useStore from "../store/useStore";
import { TaskItem } from "./TaskItem";

export const Tasks = () => {
  const { toggleTodo, removeTodo } = useStore();
  const { filteredTodos } = useFilteredTodos();

  return (
    <section>
      <ul className="list-none border border-border-color rounded-8 p-6 shadow-custom flex flex-col">
        {filteredTodos.map((todo) => (
          <TaskItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onRemove={() => removeTodo(todo.id)}
          />
        ))}
      </ul>
    </section>
  );
};
