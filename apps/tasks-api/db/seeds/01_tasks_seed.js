// apps/tasks-api/db/seeds/01_tasks_seed.js
const crypto = require('crypto');

/**
 * Generate a stable, prefixed public ID for tasks, e.g. "TSK-<uuid>"
 */
function generatePublicTaskId() {
  // Node 18+: crypto.randomUUID()
  if (typeof crypto.randomUUID === 'function') {
    return `TSK-${crypto.randomUUID()}`;
  }

  // Fallback for older Node versions
  return `TSK-${crypto.randomBytes(16).toString('hex')}`;
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('tasks').del();

  const baseTasks = [
    {
      title: 'Create basic frontend task form',
      description:
        'Implement a simple form using React hooks to submit tasks to the API.',
      status: 'todo',
      due_date_time: '2025-02-20T10:00:00Z',
    },
    {
      title: 'Add unit tests for task creation flow',
      description:
        'Write tests covering validation, controller behavior, and DB insertion.',
      status: 'in_progress',
      due_date_time: '2025-02-21T14:30:00Z',
    },
    {
      title: 'Implement API error handler',
      description:
        'Create a consistent error response format across all endpoints.',
      status: 'done',
      due_date_time: '2025-02-18T09:00:00Z',
    },
  ];

  const tasksWithIds = baseTasks.map((task) => ({
    ...task,
    public_id: generatePublicTaskId(),
  }));

  await knex('tasks').insert(tasksWithIds);
};
