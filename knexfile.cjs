require('dotenv').config();

/**
 * @type {import('knex').Knex.Config}
 */
const config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'tasks_db',
  },
  migrations: {
    directory: './apps/tasks-api/db/migrations',
  },
  seeds: {
    directory: './apps/tasks-api/db/seeds',
  },
};

module.exports = config;
