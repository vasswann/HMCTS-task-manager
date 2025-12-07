import { FormEvent, useState } from 'react';
import { CreateTaskRequest, TaskStatus } from '../../types/task';

interface TaskFormProps {
  onCreate(task: CreateTaskRequest): Promise<void>;
  loading: boolean;
}

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: 'To do' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
];

export function TaskForm({ onCreate, loading }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccess(null);

    if (!title.trim()) {
      setLocalError('Title is required.');
      return;
    }
    if (!dueDate || !dueTime) {
      setLocalError('Due date and time are required.');
      return;
    }
    // Build ISO string in local time
    const isoDue = new Date(`${dueDate}T${dueTime}`).toISOString();

    try {
      await onCreate({
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        dueDateTime: isoDue,
      });
      setSuccess('Task created successfully.');
      setTitle('');
      setDescription('');
      setStatus('todo');
      setDueDate('');
      setDueTime('');
    } catch (err) {
      // error already handled in hook. we just avoid clearing the form
      setLocalError(
        err instanceof Error ? err.message : 'Failed to create task.'
      );
    }
  };

  return (
    <div
      className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-slate-950/40"
      data-cy="task-form"
    >
      <h3 className="text-lg font-semibold mb-3">Create a new task</h3>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="text-sm text-slate-300">Title</label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Review case file"
            data-cy="task-title-input"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-slate-300">
            Description (optional)
          </label>
          <textarea
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add any extra context for this task..."
            data-cy="task-description-input"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-sm text-slate-300">Status</label>
            <select
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              data-cy="task-status-select"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-slate-300">Due date</label>
            <input
              type="date"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              data-cy="task-due-date-input"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-slate-300">Due time</label>
            <input
              type="time"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              data-cy="task-due-time-input"
            />
          </div>
        </div>

        {localError && (
          <p className="text-sm text-red-400" data-cy="task-form-error">
            {localError}
          </p>
        )}
        {success && (
          <p className="text-sm text-emerald-400" data-cy="task-form-success">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
          data-cy="create-task-button"
        >
          {loading ? 'Creating...' : 'Create task'}
        </button>
      </form>
    </div>
  );
}
