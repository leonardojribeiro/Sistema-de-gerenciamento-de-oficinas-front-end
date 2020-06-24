import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});


const apiServicos = {
  get() {
    api.post()
  }
}

export default api;
