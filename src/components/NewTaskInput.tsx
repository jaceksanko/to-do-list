import { useShallow } from "zustand/shallow";
import useStore from "../store/useStore";
import { useState } from "react";

export const NewTaskInput = () => {
  const { addTodo } = useStore(
    useShallow((state) => ({ addTodo: state.addTodo }))
  );
  const [newTask, setNewTask] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo(newTask);
      setNewTask("");
    }
  };

  return (
    <section className="mb-4">
      <input
        type="text"
        placeholder="New task input"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border rounded p-2 w-full"
      />
    </section>
  );
};
