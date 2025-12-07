import { useEffect, useState, useCallback } from 'react';
import { Task, CreateTaskRequest } from '../types/task';
import { fetchTasks, createTask } from '../api/tasksApi';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTasks();
  }, [loadTasks]);

  const handleCreateTask = useCallback(async (payload: CreateTaskRequest) => {
    try {
      setCreating(true);
      setError(null);
      const newTask = await createTask(payload);
      setTasks((prev) => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to create task';
      setError(msg);
      throw err;
    } finally {
      setCreating(false);
    }
  }, []);

  return {
    tasks,
    loading,
    creating,
    error,
    reload: loadTasks,
    create: handleCreateTask,
  };
}
