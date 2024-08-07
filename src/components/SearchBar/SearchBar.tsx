import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const query = form.elements.query.value.trim(); 
    if (!query) {
      toast.error("Please, fulfill query");
      return;
    }
    onSearch(query); 
    form.reset();
  }

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.container}>
        <input
          className={css.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
      <Toaster />
    </header>
  );
}
