import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onSubmit }) {
  return (
    <div className={css.container}>
      <button className={css.btn} onClick={onSubmit} type="button">
        Load more
      </button>
    </div>
  );
}
