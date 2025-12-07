import { NextFunction } from 'express';
import { createTask, getAllTasks } from '../daos/tasks.dao';
import { TaskStatus } from '../models/task.model';
import {
  TypedLoggedRequest,
  TypedResponse,
  API_ErrorResponse,
} from '../interfaces/http';
import { Tasks_POST_create, Tasks_GET_index } from '../interfaces/api.tasks';

const ALLOWED_STATUSES: TaskStatus[] = ['todo', 'in_progress', 'done'];

/**
 * POST /api/tasks
 */
export async function createTaskHandler(
  req: TypedLoggedRequest<Tasks_POST_create>,
  res: TypedResponse<Tasks_POST_create, 201 | 400>,
  next: NextFunction
) {
  try {
    const { title, description, status, dueDateTime } = req.body;

    req.log.info({ body: req.body }, '[CreateTask] Incoming request');

    if (!title || typeof title !== 'string') {
      req.log.warn({ title }, '[CreateTask] Invalid title');
      return res.status(400).json({
        errors: [
          {
            code: 'INVALID_TITLE',
            title: 'Invalid title',
            detail: 'title is required and must be a string',
          },
        ],
      } satisfies API_ErrorResponse);
    }

    if (!status || !ALLOWED_STATUSES.includes(status)) {
      req.log.warn({ status }, '[CreateTask] Invalid status');
      return res.status(400).json({
        errors: [
          {
            code: 'INVALID_STATUS',
            title: 'Invalid status',
            detail: `status must be one of: ${ALLOWED_STATUSES.join(', ')}`,
          },
        ],
      } satisfies API_ErrorResponse);
    }

    if (!dueDateTime) {
      req.log.warn('[CreateTask] Missing dueDateTime');
      return res.status(400).json({
        errors: [
          {
            code: 'MISSING_DUE_DATE_TIME',
            title: 'Missing dueDateTime',
            detail: 'dueDateTime is required',
          },
        ],
      } satisfies API_ErrorResponse);
    }

    const dueDate = new Date(dueDateTime);
    if (isNaN(dueDate.getTime())) {
      req.log.warn({ dueDateTime }, '[CreateTask] Invalid dueDateTime format');
      return res.status(400).json({
        errors: [
          {
            code: 'INVALID_DUE_DATE_TIME',
            title: 'Invalid dueDateTime',
            detail: 'dueDateTime must be a valid ISO date string',
          },
        ],
      } satisfies API_ErrorResponse);
    }

    // ---- Call DAO ----
    const task = await createTask({
      title,
      description,
      status,
      dueDateTime: dueDate,
    });

    req.log.info(
      { taskId: task.id, publicId: task.publicId },
      '[CreateTask] Task created'
    );

    return res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (err) {
    req.log.error({ err }, '[CreateTask] Unexpected error');
    next(err);
  }
}

/**
 * GET /api/tasks
 */
export async function listTasksHandler(
  req: TypedLoggedRequest<Tasks_GET_index>,
  res: TypedResponse<Tasks_GET_index, 200>,
  next: NextFunction
) {
  try {
    req.log.info('[ListTasks] Fetching all tasks');

    const tasks = await getAllTasks();

    return res.status(200).json({
      items: tasks,
    });
  } catch (err) {
    req.log.error({ err }, '[ListTasks] Unexpected error');
    next(err);
  }
}
