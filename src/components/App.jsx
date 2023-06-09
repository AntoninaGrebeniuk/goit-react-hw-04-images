import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { getImages } from '../services/api';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(STATUS.IDLE);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(STATUS.PENDING);

    async function getFetch() {
      try {
        const { hits, totalHits } = await getImages(query, page);

        if (totalHits === 0) {
          toast.warn('Nothing was found for your request. Please try again.');
          setIsLoading(STATUS.RESOLVED);
          return;
        }

        setImages(prevImages => [...prevImages, ...hits]);
        setTotalHits(Math.ceil(totalHits / 12));
        setIsLoading(STATUS.RESOLVED);
      } catch (error) {
        errorMessage();
        setIsLoading(STATUS.REJECTED);
      }
    }
    getFetch();
  }, [page, query]);

  const errorMessage = () => {
    toast.error(`Something went wrong!`);
  };

  const handleSearch = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setTotalHits(null);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showLoadMoreBtn = totalHits > page;

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />

      {isLoading === STATUS.PENDING && <Loader />}

      <ImageGallery images={images} />

      {showLoadMoreBtn && (
        <Button
          loadMore={handleLoadMore}
          disabled={isLoading === STATUS.PENDING ? true : false}
        >
          {isLoading === STATUS.PENDING ? 'Loading...' : 'Load more'}
        </Button>
      )}

      <ToastContainer autoClose={3000} theme="colored" />
    </div>
  );
}
