import axios from 'axios';
const instance = axios.create({
    baseURL : 'https://burger-builder-44b35.firebaseio.com/'
})
export default instance;