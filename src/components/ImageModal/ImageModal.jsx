import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "0%",
    transform: "translate(-50%, -50%)",
    maxWidth: "90%",
    maxHeight: "90%",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 1)", 
  },
};

export default function ImageModal({ modalIsOpen, closeModal, src, alt }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal"
    >
      <div className="modal-content">
        <img src={src} alt={alt} style={{ maxWidth: "100%", height: "auto" }} />
      </div>
    </Modal>
  );
}
