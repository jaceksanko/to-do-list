import { useContext } from "react";
import { FilteredTodosContext } from "./FilteredTodosContext";

export const useFilteredTodos = () => {
  const context = useContext(FilteredTodosContext);
  if (!context) {
    throw new Error(
      "useFilteredTodos must be used within a FilteredTodosProvider"
    );
  }
  return context;
};
