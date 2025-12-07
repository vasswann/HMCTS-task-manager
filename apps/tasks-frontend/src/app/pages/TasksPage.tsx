import { PageLayout } from '../components/layout/PageLayout';
import { TaskForm } from '../components/tasks/TaskForm';
import { TaskList } from '../components/tasks/TaskList';
import { useTasks } from '../hooks/useTasks';
import { CreateTaskRequest } from '../types/task';

export function TasksPage() {
  const { tasks, loading, creating, error, create } = useTasks();

  const handleCreate = async (payload: CreateTaskRequest) => {
    await create(payload);
  };

  return (
    <PageLayout title="Caseworker tasks">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] gap-6">
        <TaskForm onCreate={handleCreate} loading={creating} />
        <div className="space-y-3">
          {error && <p className="text-sm text-red-400">{error}</p>}
          <TaskList tasks={tasks} loading={loading} />
        </div>
      </div>
    </PageLayout>
  );
}
