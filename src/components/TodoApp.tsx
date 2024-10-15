import { NewTaskInput } from "./NewTaskInput";
import { Filters } from "./Filters";
import { Tasks } from "./Tasks";
import { FilteredTodosProvider } from "../context/FilteredTodosContext";

export const TodoApp = () => {
  return (
    <div className="max-w-md mx-auto min-w-[285px]">
      <NewTaskInput />
      <FilteredTodosProvider>
        <Filters />
        <Tasks />
      </FilteredTodosProvider>
    </div>
  );
};
