import * as dotenv from 'dotenv';
dotenv.config();

import { app } from './app';

const port = process.env.API_PORT ? Number(process.env.API_PORT) : 4000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
  console.log(`Create task:  POST http://localhost:${port}/api/tasks`);
});
server.on('error', console.error);
