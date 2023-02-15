/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("instructors").del();
  await knex("instructors").insert([
    {
      name: "TestInstructor1",
      gender: true,
      phone_number: "98765432",
      email: "instructor1@gym.com",
    },
    {
      name: "TestInstructor2",
      gender: false,
      email: "instructor1@gym.com",
    },
  ]);
};
