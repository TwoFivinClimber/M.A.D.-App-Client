import axios from 'axios';
import { clientCredentials } from '../../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getEvents = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/events.json`)
    .then((events) => resolve(events.data))
    .catch(reject);
});

const getPublicEvents = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events?Public=True`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getEventsByUid = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events?id=${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateEvent = (obj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/events/${obj.firebaseKey}.json`, obj)
    .then(resolve)
    .catch(reject);
});

const deleteSingleEvent = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/events/${firebaseKey}.json`)
    .then(resolve)
    .catch(reject);
});

const createEvent = (obj) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then(resolve)
    .catch(reject);
});

const getEventsByDay = (dayFbKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/events.json?orderBy="eventOfDay"&equalTo="${dayFbKey}"`)
    .then((eventsArr) => resolve(Object.values(eventsArr.data)))
    .catch(reject);
});

export {
  getEvents, createEvent, getSingleEvent, getEventsByUid, deleteSingleEvent, getPublicEvents, updateEvent, getEventsByDay,
};
