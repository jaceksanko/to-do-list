import { useShallow } from "zustand/shallow";
import useStore from "../store/useStore";
import { useState } from "react";
import ArrowDropDown from "../assets/arrow-drop-down-line.svg";

export const NewTaskInput = () => {
  const { addTodo } = useStore(
    useShallow((state) => ({ addTodo: state.addTodo }))
  );
  const [newTask, setNewTask] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (newTask) addTodo(newTask);
      setNewTask("");
    }
  };

  const handleClick = () => {
    if (newTask) addTodo(newTask);
    setNewTask("");
  };

  return (
    <section className="mb-4 relative">
      <input
        type="text"
        placeholder="New task input"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border rounded p-2 w-full pr-10 "
      />
      <button
        onClick={handleClick}
        className="absolute right-0 top-0  bg-transparent px-3 focus:outline-none border-none cursor-pointer"
      >
        <img src={ArrowDropDown} alt="Strzałka" width="24" height="24" />
      </button>
    </section>
  );
};
