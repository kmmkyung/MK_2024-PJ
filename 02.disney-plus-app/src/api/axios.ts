import axios from 'axios';

const axiosInstance = axios.create({ // axios instance 생성
  baseURL: 'https://api.themoviedb.org/3', // base URL
  params: {
    api_key: 'b41184de0c4744da37a1c84b9dec4c1c',
    language: 'ko-KR',
  },
});

export default axiosInstance;