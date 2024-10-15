import { useFilteredTodos } from "../context/useFilteredTodos";
import useStore from "../store/useStore";
import doneIcon from "../assets/done.svg";

export const Tasks = () => {
  const { toggleTodo, removeTodo } = useStore();
  const { filteredTodos } = useFilteredTodos();

  return (
    <section>
      <ul className="list-none border border-border-color rounded-8 p-6 shadow-custom flex flex-col gap-5">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center cursor-pointer"
            onClick={() => toggleTodo(todo.id)}
            role="button"
            tabIndex={0}
          >
            <div
              className={`w-18 h-18  rounded-md mr-6.5 cursor-pointer hover:opacity-70 ${
                todo.isDone
                  ? "bg-active-color"
                  : "bg-white border-checkbox-colo border-2"
              } flex items-center justify-center`}
            >
              {todo.isDone && <img src={doneIcon} alt="Task done" />}
            </div>
            <span
              className={`font-medium hover:opacity-70  ${
                todo.isDone ? "text-active-color" : "text-text-color-light"
              }`}
            >
              {todo.name}
            </span>
            <button
              className="ml-auto hover:opacity-70"
              onClick={(e) => {
                e.stopPropagation();
                removeTodo(todo.id);
              }}
              role="button"
              tabIndex={0}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
