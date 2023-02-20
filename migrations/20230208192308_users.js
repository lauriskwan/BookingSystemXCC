/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments();
    table.string("user_name").notNullable();
    table.boolean("gender").notNullable();
    table.string("phone_number").defaultTo(null);
    table.string("email").notNullable();
    table.timestamp("joined_at").defaultTo(knex.fn.now());
    table.boolean("is_member").defaultTo(false);
    table.date("expiry").defaultTo(null);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("users")
};
