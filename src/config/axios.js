import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001',
});

const token = localStorage.getItem('token');
if (token) {
    instance.defaults.headers.common['Authorization'] = token;
}

export default instance;