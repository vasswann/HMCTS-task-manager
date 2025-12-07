import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks.routes';
import { errorHandler } from './middleware/errorHanlder';
import { httpLogger } from './middleware/httpLogger';

const app = express();

// Allow frontend to call this API
app.use(
  cors({
    origin: 'http://localhost:4200',
  })
);

// HTTP request logger
app.use(httpLogger);

// Parse JSON request bodies
app.use(express.json());

// Tasks routes
app.use('/api/tasks', tasksRouter);

// Global error handler
app.use(errorHandler);

export { app };
