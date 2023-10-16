import axios from 'axios';

const API_KEY = '9f2e1f455e003246d00a9c41b725bbc8';

const movieFetch = axios.create({
  baseURL: 'https://api.openweathermap.org',
  params: {
    appid: API_KEY,
  },
});

export default movieFetch;
