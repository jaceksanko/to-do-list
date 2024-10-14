import { NewTaskInput } from "./NewTaskInput";
import { Filters } from "./Filters";
import { Tasks } from "./Tasks";
import { FilteredTodosProvider } from "../context/FilteredTodosContext";

export const TodoApp = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <NewTaskInput />
      <FilteredTodosProvider>
        <Filters />
        <Tasks />
      </FilteredTodosProvider>
    </div>
  );
};
