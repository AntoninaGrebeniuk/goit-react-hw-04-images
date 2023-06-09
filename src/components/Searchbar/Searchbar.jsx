// import { Formik } from 'formik';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SearchForm,
  Input,
  SearchFormBtn,
  SearchIcon,
  Wrapper,
} from './Searchbar.styled';

// import * as yup from 'yup';

// const schema = yup.object().shape({
//   query: yup.string().trim(),
// });

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    // если пустая строка, выводим сообщение
    if (query.trim() === '') {
      toast.info("Sorry, the search string can't be empty. Please try again.");
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header>
      <SearchForm onSubmit={handleSubmit}>
        <Wrapper>
          <SearchFormBtn type="submit">
            <SearchIcon />
          </SearchFormBtn>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={onChange}
          />
        </Wrapper>
      </SearchForm>
    </header>
  );
};

// export const Searchbar = ({ onSubmit }) => {
//   const handleSubmit = (values, actions) => {
//     console.log(values.query);
//     // если пустая строка, выводим сообщение
//     if (values.query === '') {
//       toast.info("Sorry, the search string can't be empty. Please try again.");
//       return;
//     }

//     onSubmit(values);
//     actions.resetForm();
//   };

//   return (
//     <Formik
//       initialValues={{ query: '' }}
//       validationSchema={schema}
//       onSubmit={handleSubmit}
//     >
//       <SearchForm>
//         <Wrapper>
//           <SearchFormBtn type="submit">
//             <SearchIcon />
//           </SearchFormBtn>

//           <Input
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             name="query"
//           />
//         </Wrapper>
//       </SearchForm>
//     </Formik>
//   );
// };

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
