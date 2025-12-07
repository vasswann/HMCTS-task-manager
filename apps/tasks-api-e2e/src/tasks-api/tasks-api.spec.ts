import axios from 'axios';

const API_URL = process.env.TASKS_API_URL ?? 'http://localhost:4000';

describe('POST /api/tasks', () => {
  it('should create a task successfully', async () => {
    const now = new Date();
    const dueDate = new Date(now.getTime() + 60 * 60 * 1000).toISOString(); // +1 hour

    const res = await axios.post(`${API_URL}/api/tasks`, {
      title: `Test task ${now.toISOString()}`,
      description: 'Created from e2e test',
      status: 'todo',
      dueDateTime: dueDate,
    });

    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty('message', 'Task created successfully');
    expect(res.data).toHaveProperty('task');

    const task = res.data.task;

    expect(task).toMatchObject({
      title: expect.any(String),
      description: 'Created from e2e test',
      status: 'todo',
    });

    expect(typeof task.id).toBe('number');
    expect(task.dueDateTime).toBeDefined();
  });

  it('should return 400 for invalid payload', async () => {
    try {
      await axios.post(`${API_URL}/api/tasks`, {
        description: 'Invalid task',
      });
      throw new Error('Request should have failed with 400');
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        expect(err.response.status).toBe(400);
        expect(err.response.data).toHaveProperty('errors');
        expect(Array.isArray(err.response.data.errors)).toBe(true);
      } else {
        throw err;
      }
    }
  });

  it('should fetch all tasks', async () => {
    const res = await axios.get(`${API_URL}/api/tasks`);

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('items');
    expect(Array.isArray(res.data.items)).toBe(true);

    const tasks = res.data.items;

    expect(tasks.length).toBeGreaterThan(0);

    const sample = tasks[0];

    expect(sample).toHaveProperty('id');
    expect(sample).toHaveProperty('title');
    expect(sample).toHaveProperty('status');
    expect(sample).toHaveProperty('dueDateTime');
  });
});
