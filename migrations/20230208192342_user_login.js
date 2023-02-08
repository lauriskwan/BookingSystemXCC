/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_login", function (table) {
    table.increments();
    table.string("username").unique().notNullable();
    table.string("password").notNullable();
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("users.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_login");
};
