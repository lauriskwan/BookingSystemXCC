/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("sports").del();
  await knex("sports").insert([
    {
      sport_name: "Muay Thai",
    },
    {
      sport_name: "Fitness",
    },
    {
      sport_name: "Ground Yoga",
    },
    {
      sport_name: "Aerial Yoga",
    },
  ]);
};
