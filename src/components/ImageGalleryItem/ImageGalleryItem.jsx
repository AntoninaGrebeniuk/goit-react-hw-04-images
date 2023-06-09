import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ webformatURL, tags, largeImageURL }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevModal => !prevModal);
  };

  return (
    <GalleryItem>
      <GalleryImg
        src={webformatURL}
        alt={tags}
        loading="lazy"
        onClick={toggleModal}
      />

      {isModalOpen && (
        <Modal modalImg={largeImageURL} tags={tags} closeModal={toggleModal} />
      )}
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
