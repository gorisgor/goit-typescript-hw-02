import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import css from "./App.module.css";
import { fetchImages } from "../../images-api";

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState({});
  const [isEmpty, setIsEmpty] = useState(false)

  async function handleSearch(query) {
    setImages([]);
    setPage(1);
    setTopic(prevTopic => prevTopic === query ? query + ' ' : query);
    setShowLoadMore(false);
  }

  function handleLoadMore() {
    setPage((prevPage) => prevPage + 1);
  }

  const closeModal = () => {
    setModalIsOpen(false);
    setModalImage({});
  };

  const openModal = (image) => {
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
        src={modalImage.src}
        alt={modalImage.alt}
      />
    </div>
  );
}