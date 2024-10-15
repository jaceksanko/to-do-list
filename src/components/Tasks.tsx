import { useFilteredTodos } from "../context/useFilteredTodos";
import useStore from "../store/useStore";
import doneIcon from "../assets/done.svg";

export const Tasks = () => {
  const { toggleTodo } = useStore();
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
              className={`w-18 h-18  rounded-md mr-6.5 cursor-pointer ${
                todo.isDone
                  ? "bg-active-color"
                  : "bg-white border-checkbox-colo border-2"
              } flex items-center justify-center`}
            >
              {todo.isDone && <img src={doneIcon} alt="Task done" />}
            </div>
            <span
              className={`font-medium  ${
                todo.isDone ? "text-active-color" : "text-text-color-light"
              }`}
            >
              {todo.name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
