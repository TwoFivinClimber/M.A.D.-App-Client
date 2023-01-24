import axios from 'axios';
import { clientCredentials } from '../../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createComment = (commentObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comments`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(commentObj),
  })
    .then(resolve)
    .catch(reject);
});

const getComments = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comments?event=${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleComment = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/comments.json?orderBy="commentFirebaseKey"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const updateComment = (commentObj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comments/${commentObj.id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(commentObj),
  })
    .then(resolve)
    .catch(reject);
});

const deleteComment = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/comments/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getComments, updateComment, deleteComment, createComment, getSingleComment,
};
