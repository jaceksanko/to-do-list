import { create } from "zustand";

interface Todo {
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

const useStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (name) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: Date.now().toString(), name, isDone: false },
      ],
    })),
  removeTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      ),
    })),
}));

export default useStore;