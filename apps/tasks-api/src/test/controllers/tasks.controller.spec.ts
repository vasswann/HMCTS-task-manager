import { Response, NextFunction } from 'express';
import {
  createTaskHandler,
  listTasksHandler,
} from '../../../src/controllers/tasks.controller';
import * as tasksDao from '../../../src/daos/tasks.dao';
import { Task } from '../../../src/models/task.model';
import { TypedLoggedRequest } from '../../../src/interfaces/http';
import {
  Tasks_POST_create,
  Tasks_GET_index,
} from '../../../src/interfaces/api.tasks';

type MockResponse<T = unknown> = Response<T> & {
  status: jest.Mock;
  json: jest.Mock;
};

function mockPostReq(body: unknown): TypedLoggedRequest<Tasks_POST_create> {
  return {
    body,
    log: {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    },
  } as unknown as TypedLoggedRequest<Tasks_POST_create>;
}

function mockGetReq(): TypedLoggedRequest<Tasks_GET_index> {
  return {
    log: {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    },
  } as unknown as TypedLoggedRequest<Tasks_GET_index>;
}

function mockRes<T = unknown>(): MockResponse<T> {
  const res = {} as MockResponse<T>;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('Tasks Controller - Unit Tests', () => {
  const mockNext: NextFunction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 when title is missing', async () => {
    const req = mockPostReq({
      description: 'desc',
      status: 'todo',
      dueDateTime: new Date().toISOString(),
    });

    const res = mockRes();

    await createTaskHandler(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        errors: expect.any(Array),
      })
    );
  });

  it('returns 400 for invalid status', async () => {
    const req = mockPostReq({
      title: 'Task',
      status: 'invalid',
      dueDateTime: new Date().toISOString(),
    });

    const res = mockRes();

    await createTaskHandler(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns 201 when a valid task is created', async () => {
    const dueDateTime = new Date().toISOString();

    const req = mockPostReq({
      title: 'Test Task',
      description: 'Testing',
      status: 'todo',
      dueDateTime,
    });

    const res = mockRes();

    const fakeTask: Task = {
      id: 1,
      publicId: 'TSK-123',
      title: 'Test Task',
      description: 'Testing',
      status: 'todo',
      dueDateTime: new Date(dueDateTime),
      createdAt: new Date(),
      updatedAt: null,
    };

    jest.spyOn(tasksDao, 'createTask').mockResolvedValue(fakeTask);

    await createTaskHandler(req, res, mockNext);

    expect(tasksDao.createTask).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Testing',
      status: 'todo',
      dueDateTime: expect.any(Date),
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Task created successfully',
        task: fakeTask,
      })
    );
  });

  it('returns list of tasks', async () => {
    const req = mockGetReq();
    const res = mockRes();

    const fakeTasks: Task[] = [
      {
        id: 1,
        publicId: 'TSK-abc',
        title: 'Test',
        description: null,
        status: 'todo',
        dueDateTime: new Date(),
        createdAt: new Date(),
        updatedAt: null,
      },
    ];

    jest.spyOn(tasksDao, 'getAllTasks').mockResolvedValue(fakeTasks);

    await listTasksHandler(req, res, mockNext);

    expect(tasksDao.getAllTasks).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      items: fakeTasks,
    });
  });
});
