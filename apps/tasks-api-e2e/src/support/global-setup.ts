import { spawn } from 'child_process';
import { waitForPortOpen } from '@nx/node/utils';

module.exports = async function () {
  console.log('\nSetting up API...\n');

  // Start API as child process
  const server = spawn('node', ['dist/apps/tasks-api/main.js'], {
    stdio: 'ignore', // 👈 hides all server logs to see server logs use 'inherit'
    shell: true,
    detached: true,
    env: {
      ...process.env,
      PORT: process.env.TASKS_API_PORT ?? '4000',
    },
  });

  // Save process handle for teardown
  globalThis.__API_PROCESS__ = server;

  // Wait for backend to be ready
  await waitForPortOpen(Number(process.env.TASKS_API_PORT ?? 4000), {
    host: 'localhost',
  });
};
