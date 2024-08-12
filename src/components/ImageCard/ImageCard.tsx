import { FC } from "react";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  src: {
    small: string;
    regular: string;
  };
  alt: string | null;
  openModal: (image: { src: string; alt: string | null }) => void; 
}

const ImageCard: FC<ImageCardProps> =({ src, alt, openModal }) =>{
  return (
    <>
      <img
        className={css.img}
        src={src.small}
        alt={alt ?? undefined}
        onClick={() => openModal({ src: src.regular, alt })}
      />
    </>
  );
}

export default ImageCard
