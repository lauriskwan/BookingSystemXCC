/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("instructor_login").del();
  await knex("instructor_login").insert([
    {
      username: "TestInstructor1Acc",
      password: "123456",
      instructor_id: 1,
    },
    {
      username: "TestInstructor2Acc",
      password: "123456",
      instructor_id: 2,
    },
  ]);
};
