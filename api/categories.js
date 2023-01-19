import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getCategories = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/categories.json`)
    .then((categories) => resolve(Object.values(categories.data)))
    .catch(reject);
});

const getCategorySelect = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/categories`)
    .then((categories) => categories.json())
    .then((categories) => {
      const returnArray = categories.map((cat) => ({
        name: 'category',
        label: cat.label,
        value: cat.label,
      }));
      resolve(returnArray);
    }).catch(reject);
});

export { getCategories, getCategorySelect };
