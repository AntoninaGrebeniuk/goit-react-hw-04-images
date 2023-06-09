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

        setIsLoading(STATUS.PENDING);
        setImages(prevImages => [...prevImages, ...hits]);
        setTotalHits(Math.ceil(totalHits / 12));
        setIsLoading(STATUS.RESOLVED);
      } catch (error) {
        errorMessage();
        setIsLoading(STATUS.REJECTED);
      }
    }
    getFetch();

    // getImages(query, page) //!
    //   .then(({ hits, totalHits }) => {
    //     if (totalHits === 0) {
    //       toast.warn('Nothing was found for your request. Please try again.');
    //       setIsLoading(STATUS.RESOLVED);
    //       return;
    //     }

    //     setIsLoading(STATUS.PENDING);
    //     setImages(prevImages => [...prevImages, ...hits]);
    //     setTotalHits(Math.ceil(totalHits / 12));
    //   })
    //   .catch(error => {
    //     setError(error);
    //     errorMessage();

    //     setIsLoading(STATUS.REJECTED);
    //   })
    //   .finally(() => {
    //     setIsLoading(STATUS.RESOLVED);
    //   });
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

// export class App extends Component {
//   state = {
//     images: [],
//     query: '',
//     page: 1,
//     isLoading: STATUS.IDLE,
//     totalHits: null,
//   };

//   async componentDidUpdate(_, prevState) {
//     const { query, page } = this.state;

//     if (prevState.page !== page || prevState.query !== query) {
//       this.setState({ isLoading: STATUS.PENDING });

//       try {
//         const { hits, totalHits } = await getImages(query, page);

//         if (totalHits === 0) {
//           toast.warn('Nothing was found for your request. Please try again.');
//           this.setState({ isLoading: STATUS.RESOLVED });
//           return;
//         }

//         this.setState(prevState => ({
//           images: [...prevState.images, ...hits],
//           totalHits: Math.ceil(totalHits / 12),
//         }));

//         this.setState({ isLoading: STATUS.RESOLVED });
//       } catch (error) {
//         this.errorMessage();

//         this.setState({ isLoading: STATUS.REJECTED });
//       }
//     }
//   }

//   errorMessage = () => {
//     toast.error(`Something went wrong!`);
//   };

//   handleSearch = ({ query }) => {
//     this.setState({ query, page: 1, images: [] });
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { images, isLoading, totalHits, page } = this.state;
//     const showLoadMoreBtn = totalHits > page;

//     return (
//       <div>
//         <Searchbar onSubmit={this.handleSearch} />

//         {isLoading === STATUS.PENDING && <Loader />}

//         <ImageGallery images={images} />

//         {showLoadMoreBtn && (
//           <Button
//             loadMore={this.handleLoadMore}
//             disabled={isLoading === STATUS.PENDING ? true : false}
//           >
//             {isLoading === STATUS.PENDING ? 'Loading...' : 'Load more'}
//           </Button>
//         )}

//         <ToastContainer autoClose={3000} theme="colored" />
//       </div>
//     );
//   }
// }
