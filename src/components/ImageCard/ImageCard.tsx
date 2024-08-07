import css from "./ImageCard.module.css";

export default function ImageCard({ src, alt, openModal }) {
  return (
    <>
      <img
        className={css.img}
        src={src.small}
        alt={alt}
        onClick={() => openModal({ src: src.regular, alt })}
      />
    </>
  );
}
