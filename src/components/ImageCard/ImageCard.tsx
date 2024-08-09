import { FC } from "react";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  src: {
    small: string;
    regular: string;
  };
  alt: string;
  openModal: (image: { src: string; alt: string }) => void; 
}

const ImageCard: FC<ImageCardProps> =({ src, alt, openModal }) =>{
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

export default ImageCard
