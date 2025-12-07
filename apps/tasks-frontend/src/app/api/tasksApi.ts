import { httpClient } from './httpClient';
import { Task, CreateTaskRequest } from '../types/task';

type GetTasksResponse = { items: Task[] };

type CreateTaskResponse = {
  message: string;
  task: Task;
};

export async function fetchTasks(): Promise<Task[]> {
  const data = await httpClient.get<GetTasksResponse>('/api/tasks');
  return data.items;
}

export async function createTask(payload: CreateTaskRequest): Promise<Task> {
  const data = await httpClient.post<CreateTaskResponse>('/api/tasks', payload);
  return data.task;
}
