/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("instructor_sports", function (table) {
    table.increments();
    table.integer("instructor_id").notNullable();
    table.foreign("instructor_id").references("instructors.id");
    table.integer("sport_id").notNullable();
    table.foreign("sport_id").references("sports.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("instructor_sports");
};
