import axios from 'axios'
const apiRequest = axios.create({
    baseURL: "http://localhost/laravel/public/api"
    
   
  });
  export default apiRequest;