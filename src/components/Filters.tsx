import { useFilteredTodos } from "../context/useFilteredTodos";

export const Filters = () => {
  const { filter, setFilter } = useFilteredTodos();
  return (
    <>
      <section className="mb-4 flex justify-between">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Show all
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded ${
            filter === "active" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Hide completed
        </button>
      </section>
    </>
  );
};
