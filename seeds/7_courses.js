/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("courses").del();
  await knex("courses").insert([
    {
      course_name: "Test",
      quota: 20,
      instructor_id: 1,
      sport_id: 1,
      room_id: 1,
      date: "2012-01-31",
      time_slot_id: 1,
    },
  ]);
};
