/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("instructor_courses", function (table) {
    table.increments();
    table.integer("instructor_id").notNullable();
    table.foreign("instructor_id").references("instructors.id");
    table.integer("course_id").notNullable();
    table.foreign("course_id").references("courses.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("instructor_courses");
};
