import { create } from "zustand";

export interface Todo {
  id: string;
  name: string;
  isDone: boolean;
}

interface TodoStore {
  todos: Todo[] | [];
  addTodo: (name: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

const useStore = create<TodoStore>((set) => {
  const storedTodos = localStorage.getItem("todos");
  const initialTodos = storedTodos ? JSON.parse(storedTodos) : [];

  return {
    todos: initialTodos,
    addTodo: (name) => {
      set((state) => {
        const newTodos = [
          ...state.todos,
          { id: Date.now().toString(), name, isDone: false },
        ];
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return { todos: newTodos };
      });
    },
    removeTodo: (id) =>
      set((state) => {
        const newTodos = state.todos.filter((todo) => todo.id !== id);
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return { todos: newTodos };
      }),
    toggleTodo: (id) =>
      set((state) => {
        const newTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        );
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return { todos: newTodos };
      }),
  };
});

export default useStore;
