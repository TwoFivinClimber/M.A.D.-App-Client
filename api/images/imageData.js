import axios from 'axios';
import { clientCredentials } from '../../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createImage = (obj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/images.json`, obj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/images/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const getImagesByEvent = (eventId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events?event=${eventId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteDbImage = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/photos/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export { createImage, getImagesByEvent, deleteDbImage };
