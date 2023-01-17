import { getDaysbyUid, getPublicDays } from '../day/dayData';
import { deleteImage, getImagesByEvent } from '../images/imageData';
import { getSingleUserByUid } from '../user/userData';
import {
  deleteSingleEvent, getEventsByDay, getEventsByUid, getPublicEvents, getSingleEvent, updateEvent,
} from './eventData';
import { clientCredentials } from '../../utils/client';

const dbUrl = clientCredentials.databaseURL;

const handleDayEvents = (dayFirebaseKey, eventsFbkArr) => new Promise((resolve, reject) => {
  const updateEvents = eventsFbkArr.map((firebaseKey) => updateEvent({ firebaseKey, eventOfDay: dayFirebaseKey }));
  Promise.all(updateEvents).then(() => {
    getEventsByDay(dayFirebaseKey).then((eventsArr) => {
      const removeDayArr = eventsArr.filter((event) => !eventsFbkArr.includes(event.firebaseKey));
      if (removeDayArr.length) {
        const update = { eventOfDay: '' };
        const removeTheDay = removeDayArr.map((evnt) => updateEvent({ ...evnt, ...update }));
        Promise.all(removeTheDay).then(resolve);
      }
    }).then(resolve).catch(reject);
  });
});

const deleteEvent = (firebaseKey) => new Promise((resolve, reject) => {
  getImagesByEvent(firebaseKey).then((imageArr) => {
    const deleteImages = imageArr.map((image) => deleteImage(image.firebaseKey));
    Promise.all(deleteImages).then(() => {
      resolve(deleteSingleEvent(firebaseKey));
    }).catch(reject);
  });
});

const getEventsAndDays = () => new Promise((resolve, reject) => {
  getPublicEvents().then((eventsArr) => {
    getPublicDays().then((daysArr) => {
      resolve([...eventsArr, ...daysArr]);
    }).catch(reject);
  });
});

const getEventPackage = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleEvent(firebaseKey).then((eventObj) => {
    getImagesByEvent(firebaseKey).then((imagesArr) => {
      getSingleUserByUid(eventObj.uid).then((userObj) => {
        resolve({ ...eventObj, images: imagesArr, eventUser: userObj });
      });
    });
  }).catch(reject);
});

const getEventCities = () => new Promise((resolve, reject) => {
  getPublicEvents().then((eventsArray) => {
    const returnArray = eventsArray.map((event) => ({
      name: 'city',
      value: event.city,
      label: event.city,
    }));
    resolve(returnArray);
  }).catch(reject);
});

const getPublicContentByUser = (uid) => new Promise((resolve, reject) => {
  getEventsByUid(uid).then((eventsArr) => {
    const publicEvents = eventsArr.filter((event) => event.isPublic);
    getDaysbyUid(uid).then((daysArr) => {
      const publicDays = daysArr.filter((day) => day.isPublic);
      resolve([...publicEvents, ...publicDays]);
    }).catch(reject);
  });
});

const getRandomPublicEvent = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/events?featured=True`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export {
  handleDayEvents, deleteEvent, getEventsAndDays, getEventCities, getPublicContentByUser, getRandomPublicEvent, getEventPackage,
};
