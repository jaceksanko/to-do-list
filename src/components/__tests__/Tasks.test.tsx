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

  it("should call removeTodo and prevent propagation when delete button is clicked", () => {
    render(<Tasks />);
    const deleteButton = screen.getByTestId("delete-button-1");

    toggleTodoMock.mockClear();
    removeTodoMock.mockClear();

    fireEvent.click(deleteButton);

    expect(removeTodoMock).toHaveBeenCalledWith(1);
    expect(toggleTodoMock).not.toHaveBeenCalled();
  });

  it("should apply correct styling for completed and uncompleted tasks", () => {
    render(<Tasks />);

    const uncompletedTaskCheckbox =
      screen.getByText("Task 1").previousElementSibling;
    const completedTaskCheckbox =
      screen.getByText("Task 2").previousElementSibling;

    expect(uncompletedTaskCheckbox).toHaveClass("bg-white");
    expect(uncompletedTaskCheckbox).toHaveClass("border-checkbox-color");
    expect(uncompletedTaskCheckbox).toHaveClass("border-2");
    expect(uncompletedTaskCheckbox).not.toHaveClass("bg-active-color");

    expect(completedTaskCheckbox).toHaveClass("bg-active-color");
    expect(completedTaskCheckbox).not.toHaveClass("bg-white");
    expect(completedTaskCheckbox).not.toHaveClass("border-checkbox-color");
    expect(completedTaskCheckbox).not.toHaveClass("border-2");
  });

  it("should render DoneIcon only for completed tasks", () => {
    render(<Tasks />);

    const uncompletedTaskCheckbox =
      screen.getByText("Task 1").previousElementSibling;
    const completedTaskCheckbox =
      screen.getByText("Task 2").previousElementSibling;

    expect(uncompletedTaskCheckbox).not.toContainElement(
      screen.queryByTestId("done-icon")
    );
    expect(completedTaskCheckbox).toContainElement(
      screen.getByTestId("done-icon")
    );
  });
});
