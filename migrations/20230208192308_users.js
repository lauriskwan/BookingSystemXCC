/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments();
    table.string("name").notNullable();
    table.boolean("gender").notNullable();
    table.string("phone_number");
    table.string("email").notNullable();
    table.timestamp("joined_at").defaultTo(knex.fn.now());
    table.boolean("is_member").defaultTo(false);
    table.date("expiry").defaultTo("/");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("users")
};
