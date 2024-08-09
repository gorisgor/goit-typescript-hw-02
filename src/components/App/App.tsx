import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import css from "./App.module.css";
import { fetchImages } from "../../images-api";

export interface Image {
  id: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    regular: string;
    small: string;
  };
}

interface ImageModal {
  src?: string;
  alt?: string;
}


export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [topic, setTopic] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showLoadMore, setShowLoadMore] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<ImageModal>({});
  const [isEmpty, setIsEmpty] = useState<boolean>(false)

  async function handleSearch(query: string) {
    setImages([]);
    setPage(1);
    setTopic(prevTopic => prevTopic === query ? query + ' ' : query);
    setShowLoadMore(false);
  }

  function handleLoadMore(): void {
    setPage((prevPage) => prevPage + 1);
  }

  const closeModal = (): void => {
    setModalIsOpen(false);
    setModalImage({});
  };

  const openModal = (image: ImageModal): void => {
    setModalIsOpen(true);
    setModalImage(image);  
  };

  useEffect(() => {
    if (!topic) return;

    async function getImages() {
      try {
        setIsEmpty(false)
        setLoading(true);
        setError(false);
        const { images: newImages, total_pages } = await fetchImages(
          topic,
          page
        );
        if (total_pages === 0) {
          setIsEmpty(true);
          return;
        }
        setImages((prevImages) => [...prevImages, ...newImages]);
        setTotalPages(total_pages);
        setShowLoadMore(page < total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getImages();
    
    
  }, [page, topic]);
  console.log(images);

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {isEmpty && <p style={{
        fontSize: '26px',
         color: "orange",
      }}>Hello, friend! Please, enter a valid query!</p>}
      {images.length > 0 && (
        <ImageGallery  items={images} openModal={openModal} />
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {showLoadMore && !loading && <LoadMoreBtn onSubmit={handleLoadMore} />}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalImage.src || ''}
        alt={modalImage.alt || ''}
      />
    </div>
  );
}