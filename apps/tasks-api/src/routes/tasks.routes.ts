// apps/tasks-api/src/routes/tasks.routes.ts
import { Router } from 'express';
import {
  createTaskHandler,
  listTasksHandler,
} from '../controllers/tasks.controller';

const router = Router();

router.get('/', listTasksHandler);
router.post('/', createTaskHandler);

export default router;
