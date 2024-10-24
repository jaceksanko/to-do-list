import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TaskItem } from "../TaskItem";
import { describe, it, expect, vi } from "vitest";
import { Todo } from "../../store/useStore";

describe("TaskItem Component", () => {
  const mockTodo: Todo = { id: "1", name: "Test Task", isDone: false };
  const onToggleMock = vi.fn();
  const onRemoveMock = vi.fn();

  it("should render task item correctly", () => {
    render(
      <TaskItem
        todo={mockTodo}
        onToggle={onToggleMock}
        onRemove={onRemoveMock}
      />
    );
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByLabelText("Delete task: Test Task")).toBeInTheDocument();
  });

  it("should call onToggle when clicked", () => {
    render(
      <TaskItem
        todo={mockTodo}
        onToggle={onToggleMock}
        onRemove={onRemoveMock}
      />
    );
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  it("should call onRemove when delete button is clicked", () => {
    const onRemoveMock = vi.fn();
    const onToggleMock = vi.fn();
    render(
      <TaskItem
        todo={{ id: "1", name: "Test Task", isDone: false }}
        onRemove={onRemoveMock}
        onToggle={onToggleMock}
      />
    );

    fireEvent.click(screen.getByLabelText("Delete task: Test Task"));

    expect(onRemoveMock).toHaveBeenCalledTimes(1);
    expect(onToggleMock).not.toHaveBeenCalled();
  });

  it("should apply correct styling for completed task", () => {
    const completedTodo = { ...mockTodo, isDone: true };
    render(
      <TaskItem
        todo={completedTodo}
        onToggle={onToggleMock}
        onRemove={onRemoveMock}
      />
    );
    expect(screen.getByTestId("task-item-checkbox")).toHaveClass("bg-active-color");
    expect(screen.getByText("Test Task")).toHaveClass("text-active-color");
    expect(screen.getByTestId("done-icon")).toBeInTheDocument();
  });

  it("should apply correct styling for uncompleted task", () => {
    render(
      <TaskItem
        todo={mockTodo}
        onToggle={onToggleMock}
        onRemove={onRemoveMock}
      />
    );
    console.log(screen.debug());
    expect(screen.getByTestId("task-item-checkbox")).toHaveClass("bg-white");
    expect(screen.getByTestId("task-item-checkbox")).toHaveClass("border-checkbox-color");
    expect(screen.getByText("Test Task")).toHaveClass("text-text-color-light");
    expect(screen.queryByTestId("done-icon")).not.toBeInTheDocument();
  });
});
