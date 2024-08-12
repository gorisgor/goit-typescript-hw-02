import { FC } from "react";
import { Image, ImageModal } from "../App/App";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  items:Image[];
  openModal:(image: ImageModal)=> void;
}

 const ImageGallery: FC<ImageGalleryProps> = ({ items, openModal }) => {
  return (
    <ul className={css.gallery}>
      {items.map((item) => (
        <li key={item.id} className={css.card}>
          <ImageCard
            src={item.urls}
            alt={item.alt_description}
            openModal={openModal}
          />
        </li>
      ))}
    </ul>
  );
}
export default ImageGallery