import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalBox, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ closeModal, tags, modalImg }) {
  useEffect(() => {
    const closeByEsc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', closeByEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', closeByEsc);
      document.body.style.overflow = 'visible';
    };
  }, [closeModal]);

  const closeByBackdrop = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={closeByBackdrop}>
      <ModalBox>
        <ModalImg src={modalImg} loading="lazy" alt={tags} />
      </ModalBox>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
