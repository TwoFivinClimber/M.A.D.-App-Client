import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getDaytimes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/daytimes`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getDaytimes;
