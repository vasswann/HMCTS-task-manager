// Allowed statuses for a task
export type TaskStatus = 'todo' | 'in_progress' | 'done';

// Shape of a Task record as used in the app
export interface Task {
  id: number;
  publicId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  dueDateTime: Date;
  createdAt: Date;
  updatedAt: Date | null;
}

// Input when creating a new task
export interface CreateTaskInput {
  title: string;
  description?: string;
  status: TaskStatus;
  dueDateTime: Date;
}
