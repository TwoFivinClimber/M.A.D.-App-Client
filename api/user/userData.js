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
    .then((response) => response.json())
    .then(resolve)
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

const updateUser = (userObj, id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObj),
  })
    .then(resolve)
    .catch(reject);
});

const createUser = (userObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObj),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteUser = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getUser, updateUser, createUser, getUserByFbKey, deleteUser, checkUser,
};
