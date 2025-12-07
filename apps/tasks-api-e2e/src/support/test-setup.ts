import axios from 'axios';

module.exports = async function () {
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.TASKS_API_PORT ?? '4000';

  axios.defaults.baseURL = `http://${host}:${port}`;
};
