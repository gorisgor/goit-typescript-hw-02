import toast, { Toaster } from "react-hot-toast";
import { FC, FormEvent } from "react";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (query: string)=>void
}

const SearchBar: FC<SearchBarProps> =({ onSearch }) => {
  function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const queryInput = form.elements.namedItem('query') as HTMLInputElement;
    const query = queryInput.value.trim(); 
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

export default SearchBar;