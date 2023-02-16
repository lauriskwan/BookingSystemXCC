/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("courses", function (table) {
    table.increments();
    table.string("course_name").notNullable();
    table.string("description");
    table.integer("quota").notNullable();
    table.integer("instructor_id").notNullable();
    table.foreign("instructor_id").references("instructors.id");
    table.integer("sport_id").notNullable();
    table.foreign("sport_id").references("sports.id");
    table.integer("room_id").notNullable();
    table.foreign("room_id").references("rooms.id");
    table.string("date").notNullable();
    table.integer("time_slot_id").notNullable();
    table.foreign("time_slot_id").references("time_slot.id");
    table.string("image_path");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("courses");
};