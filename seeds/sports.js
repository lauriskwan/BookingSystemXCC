/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("sports").del();
  await knex("sports").insert([
    {
      sport_name: "MuayThai",
    },
    {
      sport_name: "Fitness",
    },
    {
      sport_name: "GroundYoga",
    },
    {
      sport_name: "AerialYoga",
    },
  ]);
};
