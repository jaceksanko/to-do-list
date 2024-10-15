import { useFilteredTodos } from "../context/useFilteredTodos";

export const Filters = () => {
  const { filter, setFilter } = useFilteredTodos();
  return (
    <>
      <section className="mb-4 flex justify-between">
        <button
          onClick={() => setFilter("all")}
          className={`btn  ${
            filter === "all" ? "btn-active" : ""
          } pl-31.69 pr-23.69 `}
        >
          Show all
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`btn ${
            filter === "active" ? "btn-active" : ""
          }`}
        >
          Hide completed
        </button>
      </section>
    </>
  );
};
