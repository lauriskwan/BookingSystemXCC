/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("course_users", function (table) {
    table.increments();
    table.integer("course_id").notNullable();
    table.foreign("course_id").references("courses.id");
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("users.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("course_users");
};
