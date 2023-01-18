import axios from 'axios';
import { clientCredentials } from '../../utils/client';

const dbUrl = clientCredentials.databaseURL;

// FOR CHECKING IF USER HAS PROFILE //
const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/checkuser`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (response.status === 500) {
        resolve({ valid: false });
      } else {
        resolve(response.json());
      }
    })
    .catch(reject);
});

const getUser = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getUserByFbKey = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users/${firebaseKey}.json`)
    .then((userObj) => resolve(userObj.data))
    .catch(reject);
});

const updateUser = (update) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/users/${update.firebaseKey}.json`, update)
    .then((userObj) => resolve(userObj.data))
    .catch(reject);
});

const createUser = (userObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/users.json`, userObj)
    .then((response) => {
      const update = { firebaseKey: response.data.name };
      updateUser(update)
        .then((userObject) => resolve(userObject.data))
        .catch(reject);
    });
});

const deleteThisUser = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/users/${firebaseKey}.json`)
    .then(resolve)
    .catch(reject);
});

export {
  getUser, updateUser, createUser, getUserByFbKey, deleteThisUser, checkUser,
};
