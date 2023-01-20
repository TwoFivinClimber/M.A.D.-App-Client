import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/categories`)
    .then((response) => response.json())
    .then(resolve)
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
