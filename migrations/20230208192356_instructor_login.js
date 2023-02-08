/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("instructor_login", function (table) {
    table.increments();
    table.string("username").unique().notNullable();
    table.string("password").notNullable();
    table.integer("instructor_id").notNullable();
    table.foreign("instructor_id").references("instructors.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("instructor_login");
};