// apps/tasks-api/src/daos/tasks.dao.ts
import { db } from '../db';
import { Task, TaskStatus, CreateTaskInput } from '../models/task.model';
import crypto from 'crypto';

// Type representing how the row looks in the DB (snake_case)
export interface TaskRow {
  id: number;
  public_id: string;
  title: string;
  description: string | null;
  status: string;
  due_date_time: Date;
  created_at: Date;
  updated_at: Date | null;
}

/**
 * Generate a stable, prefixed public ID for tasks, e.g. "TSK-<uuid>"
 */
function generatePublicTaskId(): string {
  const uuidFn = crypto.randomUUID?.bind(crypto);

  if (uuidFn) {
    return `TSK-${uuidFn()}`;
  }

  return `TSK-${crypto.randomBytes(16).toString('hex')}`;
}

function mapRowToTask(row: TaskRow): Task {
  return {
    id: row.id,
    publicId: row.public_id,
    title: row.title,
    description: row.description,
    status: row.status as TaskStatus,
    dueDateTime: row.due_date_time,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Create a new task
 */
export async function createTask(input: CreateTaskInput): Promise<Task> {
  const publicId = generatePublicTaskId();
  const [row] = await db<TaskRow>('tasks')
    .insert({
      public_id: publicId,
      title: input.title,
      description: input.description ?? null,
      status: input.status,
      due_date_time: input.dueDateTime,
    })
    .returning([
      'id',
      'public_id',
      'title',
      'description',
      'status',
      'due_date_time',
      'created_at',
      'updated_at',
    ]);

  return mapRowToTask(row);
}

/**
 * Fetch all tasks
 */
export async function getAllTasks(): Promise<Task[]> {
  const rows = await db<TaskRow>('tasks')
    .select(
      'id',
      'public_id',
      'title',
      'description',
      'status',
      'due_date_time',
      'created_at',
      'updated_at'
    )
    .orderBy('created_at', 'desc');

  return rows.map(mapRowToTask);
}
