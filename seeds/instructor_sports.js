/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("instructor_sports").del();
  await knex("instructor_sports").insert([
    {
      instructor_id: 1,
      sport_id: 1,
    },
    {
      instructor_id: 1,
      sport_id: 2,
    },
    {
      instructor_id: 2,
      sport_id: 3,
    },
    {
      instructor_id: 2,
      sport_id: 4,
    },
  ]);
};
