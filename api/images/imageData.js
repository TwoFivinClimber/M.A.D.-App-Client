import { clientCredentials } from '../../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getImagesByEvent = (eventId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/photos?event=${eventId}`)
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

export { getImagesByEvent, deleteDbImage };
