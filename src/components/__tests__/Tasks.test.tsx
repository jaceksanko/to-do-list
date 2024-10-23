import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tasks } from "../Tasks";
import useStore from "../../store/useStore";
import { useFilteredTodos } from "../../context/useFilteredTodos";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../context/useFilteredTodos");
vi.mock("../../store/useStore", () => ({
  default: vi.fn(),
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
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("should toggle todo on click", () => {
    render(<Tasks />);
    const taskItem = screen.getByText("Task 1");
    fireEvent.click(taskItem);
    expect(toggleTodoMock).toHaveBeenCalledWith(1);
  });

  it("should remove todo on delete button click", () => {
    render(<Tasks />);
    const deleteButton = screen.getAllByRole("button")[1];
    fireEvent.click(deleteButton);
    expect(removeTodoMock).toHaveBeenCalledWith(1);
  });
});
