import { FC } from "react";
import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onSubmit: ()=>void
}

 const LoadMoreBtn: FC<LoadMoreBtnProps> =({ onSubmit }) => {
  return (
    <div className={css.container}>
      <button className={css.btn} onClick={onSubmit} type="button">
        Load more
      </button>
    </div>
  );
}
export default LoadMoreBtn;
