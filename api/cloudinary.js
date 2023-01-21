import axios from 'axios';

const cloudUrl = 'https://api.cloudinary.com/v1_1/twofiveclimb/image/upload';
const cloudDestroy = 'https://api.cloudinary.com/v1_1/twofiveclimb/image/destroy';

const uploadPhoto = (payload) => new Promise((resolve, reject) => {
  axios.post(`${cloudUrl}`, payload)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deletePhoto = (data) => new Promise((resolve, reject) => {
  axios.post(`${cloudDestroy}`, data)
    .then(resolve)
    .catch(reject);
});

export { uploadPhoto, deletePhoto };
