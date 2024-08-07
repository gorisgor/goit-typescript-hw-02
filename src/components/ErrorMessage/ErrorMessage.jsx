import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <div className={css.container}>
      <p>Oops,...something went wrong. Please, try to reload page.</p>
    </div>
  );
}
