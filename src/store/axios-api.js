import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: 'https://apollo-1.azurewebsites.net'
});

instance.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('AUTH_TOKEN');

export default instance;