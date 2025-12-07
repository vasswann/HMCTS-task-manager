import { Task } from '../../types/task';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
}

function formatStatus(status: Task['status']) {
  switch (status) {
    case 'todo':
      return 'To do';
    case 'in_progress':
      return 'In progress';
    case 'done':
      return 'Done';
    default:
      return status;
  }
}

function statusColor(status: Task['status']) {
  switch (status) {
    case 'todo':
      return 'bg-slate-800 text-slate-100';
    case 'in_progress':
      return 'bg-amber-500/20 text-amber-300 border border-amber-500/40';
    case 'done':
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
    default:
      return 'bg-slate-800 text-slate-100';
  }
}

export function TaskList({ tasks = [], loading }: TaskListProps) {
  if (loading && tasks.length === 0) {
    return (
      <div
        className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
        data-cy="task-list-loading"
      >
        <p className="text-sm text-slate-400">Loading tasks…</p>
      </div>
    );
  }

  if (!loading && tasks.length === 0) {
    return (
      <div
        className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
        data-cy="task-list-empty"
      >
        <p className="text-sm text-slate-400">
          No tasks yet. Create one on the left to get started.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-slate-950/40"
      data-cy="task-list"
    >
      <h3 className="text-lg font-semibold mb-3">Your tasks</h3>
      <ul className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
        {tasks.map((task) => (
          <li
            key={task.publicId}
            className="rounded-lg border border-slate-800 bg-slate-950/40 p-3 flex flex-col gap-1"
            data-cy="task-card"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="text-sm font-semibold" data-cy="task-title">
                  {task.title}
                </h4>
                {task.description && (
                  <p className="text-xs text-slate-400 mt-0.5">
                    {task.description}
                  </p>
                )}
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${statusColor(
                  task.status
                )}`}
                data-cy="task-status-badge"
              >
                {formatStatus(task.status)}
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[11px] text-slate-500">
                Due:{' '}
                {new Date(task.dueDateTime).toLocaleString(undefined, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
              <span className="text-[11px] text-slate-600">
                Created:{' '}
                {new Date(task.createdAt).toLocaleString(undefined, {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
