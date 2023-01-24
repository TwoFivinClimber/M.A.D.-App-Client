/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import sha1 from 'sha1';
import { clientCredentials } from '../utils/client';

const cldnryApiKey = clientCredentials.cloudinaryApiKey;
const cldnrySecret = clientCredentials.cloudinaryApiSecret;
const cloudUrl = 'https://api.cloudinary.com/v1_1/twofiveclimb/image/upload';
const cloudDestroy = 'https://api.cloudinary.com/v1_1/twofiveclimb/image/destroy';

const uploadPhoto = (file) => new Promise((resolve, reject) => {
  const payload = new FormData();
  payload.append('file', file);
  payload.append('upload_preset', 'f76x3jwi');
  payload.append('cloud_name', 'twofiveclimb');
  axios.post(`${cloudUrl}`, payload)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deletePhoto = (imageObj) => new Promise((resolve, reject) => {
  const timeStamp = Math.round((new Date().getTime() / 1000));
  const data = new FormData();
  data.append('public_id', imageObj.publicId);
  data.append('timestamp', timeStamp);
  data.append('api_key', cldnryApiKey);
  data.append('signature', sha1(`public_id=${imageObj.publicId}&timestamp=${timeStamp}${cldnrySecret}`));
  axios.post(`${cloudDestroy}`, data)
    .then(resolve)
    .catch(reject);
});

export { uploadPhoto, deletePhoto };
