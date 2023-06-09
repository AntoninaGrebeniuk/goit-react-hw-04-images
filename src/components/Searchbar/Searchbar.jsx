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

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
