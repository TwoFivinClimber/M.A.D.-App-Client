import { getEventsByDay, getEventsByUid, updateEvent } from '../events/eventData';
import { getImagesByEvent } from '../images/imageData';
import { deleteSingleDay, getSingleDay } from './dayData';

const getDayPackage = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleDay(firebaseKey).then((dayObj) => {
    getEventsByDay(firebaseKey).then((eventsArr) => {
      const imageUrlArr = [];
      const getImages = eventsArr.map((event) => getImagesByEvent(event.firebaseKey).then((imgObjArr) => {
        imgObjArr.map((obj) => imageUrlArr.push(obj.imageUrl));
      }));
      Promise.all(getImages).then(resolve({ ...dayObj, events: eventsArr, images: imageUrlArr }));
    }).catch(reject);
  });
});

const deleteDay = (firebaseKey) => new Promise((resolve, reject) => {
  getEventsByDay(firebaseKey).then((eventsArr) => {
    const update = { eventOfDay: '' };
    const removeEvents = eventsArr.map((event) => updateEvent({ ...event, ...update }));
    Promise.all(removeEvents).then(() => {
      resolve(deleteSingleDay(firebaseKey));
    }).catch(reject);
  });
});

const getDayFormPackage = (firebaseKey, uid) => new Promise((resolve, reject) => {
  getEventsByUid(uid).then((uidArray) => {
    getEventsByDay(firebaseKey).then((dayEventArray) => {
      const eventFbKeys = [];
      dayEventArray.map((event) => eventFbKeys.push(event.firebaseKey));
      resolve({ events: uidArray, dayEvents: eventFbKeys });
    }).catch(reject);
  });
});

// const getRandomPublicDay = () => new Promise((resolve, reject) => {
//   getPublicDays().then((eventsArr) => {
//     const index = Math.floor(Math.random() * eventsArr.length);
//     const event = eventsArr[index];
//     getSingleUserByUid(event.uid).then((evUser) => {
//       resolve({ ...event, evUser });
//     });
//   }).catch(reject);
// });

// eslint-disable-next-line import/prefer-default-export
export {
  getDayPackage, deleteDay, getDayFormPackage,
};
