// apps/tasks-api/src/interfaces/api.tasks.ts
import { EndpointDefinition, API_ErrorResponse } from './http';
import { Task, TaskStatus } from '../models/task.model';

/**
 * Shape of the Task object we return from the API.
 */
export type TaskObject = Task;

export interface Tasks_POST_create extends EndpointDefinition {
  RequestBody: {
    title: string;
    description?: string;
    status: TaskStatus;
    // client sends this as ISO string
    dueDateTime: string;
  };
  Responses: {
    201: {
      message: string;
      task: TaskObject;
    };
    400: API_ErrorResponse;
    500: API_ErrorResponse;
  };
}

/**
 * GET /tasks – list all tasks
 */
export interface Tasks_GET_index extends EndpointDefinition {
  Responses: {
    200: {
      items: TaskObject[];
    };
    500: API_ErrorResponse;
  };
}
