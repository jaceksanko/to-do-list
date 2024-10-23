import { render, screen, fireEvent } from "@testing-library/react";
import { Filters } from "../Filters";
import {
  FilteredTodosContextType,
  FilteredTodosProvider,
} from "../../context/FilteredTodosContext";
import "@testing-library/jest-dom";
import * as useFilteredTodosModule from "../../context/useFilteredTodos";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("Filters", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders two buttons", () => {
    render(
      <FilteredTodosProvider>
        <Filters />
      </FilteredTodosProvider>
    );

    expect(screen.getByTestId("show-all-button")).toBeInTheDocument();
    expect(screen.getByTestId("hide-completed-button")).toBeInTheDocument();
  });

  it('the "Show all" button has the active class when the filter is set to "all"', () => {
    render(
      <FilteredTodosProvider>
        <Filters />
      </FilteredTodosProvider>
    );

    expect(screen.getByTestId("show-all-button")).toHaveClass("btn-active");
    expect(screen.getByTestId("hide-completed-button")).not.toHaveClass(
      "btn-active"
    );
  });

  it("calls setFilter with the appropriate argument when a button is clicked", () => {
    const mockSetFilter = vi.fn();
    vi.spyOn(useFilteredTodosModule, "useFilteredTodos").mockReturnValue({
      filter: "all",
      setFilter: mockSetFilter,
      filteredTodos: [],
    } as FilteredTodosContextType);

    render(
      <FilteredTodosProvider>
        <Filters />
      </FilteredTodosProvider>
    );

    fireEvent.click(screen.getByTestId("hide-completed-button"));
    expect(mockSetFilter).toHaveBeenCalledWith("active");

    fireEvent.click(screen.getByTestId("show-all-button"));
    expect(mockSetFilter).toHaveBeenCalledWith("all");
  });
});
