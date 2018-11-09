import axios from 'axios';

const ROOT_URL = 'https://api.imgur.com';

export default {
  fetchImages(token){
return axios.get(`${ROOT_URL}/3/account/me/images`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  }
};