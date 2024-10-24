import DoneIcon from "../assets/done.svg?react";
import { Todo } from "../store/useStore";

export const TaskItem = ({
  todo,
  onToggle,
  onRemove,
}: {
  todo: Todo;
  onToggle: () => void;
  onRemove: () => void;
}) => (
  <li
    className="flex items-center cursor-pointer p-2 hover:bg-gray-100 rounded transition-colors"
    onClick={onToggle}
    role="checkbox"
    aria-checked={todo.isDone}
    tabIndex={0}
  >
    <div
      className={`w-18 h-18 rounded-md mr-6.5 flex items-center justify-center ${
        todo.isDone
          ? "bg-active-color"
          : "bg-white border-checkbox-color border-2"
      }`}
      data-testid="task-item-checkbox"
    >
      {todo.isDone && <DoneIcon data-testid="done-icon" aria-hidden="true" />}
    </div>
    <span
      className={`font-medium ${
        todo.isDone ? "text-active-color" : "text-text-color-light"
      }`}
    >
      {todo.name}
    </span>
    <button
      className="ml-auto p-2 hover:bg-red-100 rounded transition-colors"
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      aria-label={`Delete task: ${todo.name}`}
    >
      🗑️
    </button>
  </li>
);