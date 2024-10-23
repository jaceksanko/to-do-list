import { act, renderHook } from "@testing-library/react";
import useStore, { Todo } from "../useStore";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("useStore", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetModules();
  });

  it("should initialize with empty todos if localStorage is empty", () => {
    const { result } = renderHook(() => useStore());
    expect(result.current.todos).toEqual([]);
  });

  it("should initialize with todos from localStorage", async () => {
    const initialTodos: Todo[] = [
      { id: "1", name: "Test Todo", isDone: false },
    ];

    localStorage.setItem("todos", JSON.stringify(initialTodos));

    const useStoreModule = await vi.importActual<typeof import("../useStore")>(
      "../useStore"
    );
    const useStore = useStoreModule.default;

    const { result } = renderHook(() => useStore());

    expect(result.current.todos).toEqual(initialTodos);
  });

  it("should add a new todo", () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.addTodo("New Todo");
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].name).toBe("New Todo");
    expect(result.current.todos[0].isDone).toBe(false);
    expect(localStorage.getItem("todos")).toBe(
      JSON.stringify(result.current.todos)
    );
  });

  it("should remove a todo", () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.addTodo("Todo to remove");
    });
    const todoId = result.current.todos[0].id;
    expect(result.current.todos.some((todo) => todo.id === todoId)).toBe(true);

    act(() => {
      result.current.removeTodo(todoId);
    });

    expect(result.current.todos.some((todo) => todo.id === todoId)).toBe(false);
  });

  it("should toggle a todo", () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.addTodo("Todo to toggle");
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(todoId);
    });

    expect(result.current.todos[0].isDone).toBe(true);

    act(() => {
      result.current.toggleTodo(todoId);
    });

    expect(result.current.todos[0].isDone).toBe(false);
    expect(localStorage.getItem("todos")).toBe(
      JSON.stringify(result.current.todos)
    );
  });
});
