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

  // componentDidMount() {
  //   window.addEventListener('keydown', closeByEsc);
  //   document.body.style.overflow = 'hidden';
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', closeByEsc);
  //   document.body.style.overflow = 'visible';
  // }

  const closeByBackdrop = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  // const { tags, modalImg } = this.props;

  return createPortal(
    <Overlay onClick={closeByBackdrop}>
      <ModalBox>
        <ModalImg src={modalImg} loading="lazy" alt={tags} />
      </ModalBox>
    </Overlay>,
    modalRoot
  );
}

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.closeByEsc);
//     document.body.style.overflow = 'hidden';
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.closeByEsc);
//     document.body.style.overflow = 'visible';
//   }

//   closeByEsc = e => {
//     if (e.code === 'Escape') {
//       this.props.closeModal();
//     }
//   };

//   closeByBackdrop = e => {
//     if (e.currentTarget === e.target) {
//       this.props.closeModal();
//     }
//   };

//   render() {
//     const { tags, modalImg } = this.props;

//     return createPortal(
//       <Overlay onClick={this.closeByBackdrop}>
//         <ModalBox>
//           <ModalImg src={modalImg} loading="lazy" alt={tags} />
//         </ModalBox>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
