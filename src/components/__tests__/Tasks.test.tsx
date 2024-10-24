import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tasks } from "../Tasks";
import useStore from "../../store/useStore";
import { useFilteredTodos } from "../../context/useFilteredTodos";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../context/useFilteredTodos");
vi.mock("../../store/useStore", () => ({
  default: vi.fn(),
}));
vi.mock("../TaskItem", () => ({
  TaskItem: ({ todo, onToggle, onRemove }: {
    todo: { id: string; name: string },
    onToggle: () => void,
    onRemove: () => void
  }) => (
    <li data-testid={`task-item-${todo.id}`}>
      <span>{todo.name}</span>
      <button onClick={onToggle}>Toggle</button>
      <button onClick={onRemove}>Remove</button>
    </li>
  ),
}));

describe("Tasks Component", () => {
  const toggleTodoMock = vi.fn();
  const removeTodoMock = vi.fn();

  beforeEach(() => {
    (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      toggleTodo: toggleTodoMock,
      removeTodo: removeTodoMock,
    });

    (useFilteredTodos as ReturnType<typeof vi.fn>).mockReturnValue({
      filteredTodos: [
        { id: 1, name: "Task 1", isDone: false },
        { id: 2, name: "Task 2", isDone: true },
      ],
    });
  });

  it("should render tasks", () => {
    render(<Tasks />);
    expect(screen.getByTestId("task-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("task-item-2")).toBeInTheDocument();
  });

  it("should pass correct props to TaskItem", () => {
    render(<Tasks />);
    const task1 = screen.getByTestId("task-item-1");
    expect(task1).toHaveTextContent("Task 1");
    expect(task1.querySelector("button:first-of-type")).toHaveTextContent("Toggle");
    expect(task1.querySelector("button:last-of-type")).toHaveTextContent("Remove");
  });
});
