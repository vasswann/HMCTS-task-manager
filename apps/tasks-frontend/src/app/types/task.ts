export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: number;
  publicId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  // Dates come as ISO strings from the API
  dueDateTime: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  status: TaskStatus;
  // ISO string
  dueDateTime: string;
}
