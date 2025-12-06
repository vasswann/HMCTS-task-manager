/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary(); // internal PK (fast, efficient)
    table.string('public_id').notNullable().unique(); // exposed to API users
    table.string('title').notNullable(); // required title
    table.text('description'); // optional description
    table.string('status').notNullable(); // e.g. 'todo', 'in_progress', 'done'
    table.timestamp('due_date_time').notNullable(); // due date/time
    table.timestamps(true, true); // created_at, updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('tasks');
};
