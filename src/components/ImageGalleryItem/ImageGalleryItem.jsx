import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ webformatURL, tags, largeImageURL }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // state = {
  //   isModalOpen: false,
  // };

  const toggleModal = () => {
    setIsModalOpen(prevModal => !prevModal);
  };

  // const { webformatURL, tags, largeImageURL } = this.props;

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

// export class ImageGalleryItem extends Component {
//   state = {
//     isModalOpen: false,
//   };

//   toggleModal = () => {
//     this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
//   };

//   render() {
//     const { webformatURL, tags, largeImageURL } = this.props;
//     const { isModalOpen } = this.state;

//     return (
//       <GalleryItem>
//         <GalleryImg
//           src={webformatURL}
//           alt={tags}
//           loading="lazy"
//           onClick={this.toggleModal}
//         />

//         {isModalOpen && (
//           <Modal
//             modalImg={largeImageURL}
//             tags={tags}
//             closeModal={this.toggleModal}
//           />
//         )}
//       </GalleryItem>
//     );
//   }
// }

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
