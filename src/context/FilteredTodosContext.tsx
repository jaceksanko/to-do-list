import { createContext, useState, useEffect } from "react";
import useStore, { Todo } from "../store/useStore";

interface FilteredTodosContextType {
  filteredTodos: Todo[];
  filter: "all" | "active";
  setFilter: React.Dispatch<React.SetStateAction<"all" | "active">>;
}

export const FilteredTodosContext = createContext<
  FilteredTodosContextType | undefined
>(undefined);

export const FilteredTodosProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { todos } = useStore();
  const [filter, setFilter] = useState<"all" | "active">("all");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setFilteredTodos(
      filter === "all" ? todos : todos.filter((todo) => !todo.isDone)
    );
  }, [filter, todos]);

  return (
    <FilteredTodosContext.Provider value={{ filteredTodos, filter, setFilter }}>
      {children}
    </FilteredTodosContext.Provider>
  );
};


