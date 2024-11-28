//BASE DA URL: https://api.themoviedb.org/3/
//URL DA API: /movie/now_playing?api_key=7dee59d8dab4072605365cccb47be465

import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;