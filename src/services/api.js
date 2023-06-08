import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImages = async (query, page) => {
  console.log(query);

  const paramsString = new URLSearchParams({
    key: '35091014-169cc5cb569a490d18041ebe8',
    q: query,
    page,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

  const response = await axios.get(`?${paramsString}`);

  return response.data;
};
