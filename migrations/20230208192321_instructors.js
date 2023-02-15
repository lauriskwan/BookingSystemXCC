/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("instructors", function (table) {
    table.increments();
    table.string("name").notNullable();
    table.boolean("gender").notNullable();
    table.string("phone_number").defaultTo(null);;
    table.string("email").notNullable();
    table.timestamp("joined_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("instructors");
};
