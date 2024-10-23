import { render, act } from "@testing-library/react";
import {
  FilteredTodosProvider,
  FilteredTodosContext,
} from "../FilteredTodosContext";
import useStore from "../../store/useStore";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../store/useStore", () => ({
  default: vi.fn(),
}));

describe("FilteredTodosProvider", () => {
  const mockTodos = [
    { id: "1", name: "Task 1", isDone: false },
    { id: "2", name: "Task 2", isDone: true },
    { id: "3", name: "Task 3", isDone: false },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    (useStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      todos: mockTodos,
    });
  });

  it("should provide all todos when filter is set to 'all'", () => {
    let contextValue:
      | React.ContextType<typeof FilteredTodosContext>
      | undefined;
    render(
      <FilteredTodosProvider>
        <FilteredTodosContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </FilteredTodosContext.Consumer>
      </FilteredTodosProvider>
    );

    expect(contextValue?.filteredTodos).toEqual(mockTodos);
    expect(contextValue?.filter).toBe("all");
  });

  it("should provide only active todos when filter is set to 'active'", () => {
    let contextValue:
      | React.ContextType<typeof FilteredTodosContext>
      | undefined;
    const { rerender } = render(
      <FilteredTodosProvider>
        <FilteredTodosContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </FilteredTodosContext.Consumer>
      </FilteredTodosProvider>
    );

    act(() => {
      contextValue?.setFilter("active");
    });

    rerender(
      <FilteredTodosProvider>
        <FilteredTodosContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </FilteredTodosContext.Consumer>
      </FilteredTodosProvider>
    );

    expect(contextValue?.filteredTodos).toEqual([
      { id: "1", name: "Task 1", isDone: false },
      { id: "3", name: "Task 3", isDone: false },
    ]);
    expect(contextValue?.filter).toBe("active");
  });
});
