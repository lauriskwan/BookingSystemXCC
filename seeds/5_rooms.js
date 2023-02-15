/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("rooms").del();
  await knex("rooms").insert([
    {
      room_name: "1",
      description: "With fitness equipment",
    },
    {
      room_name: "2",
      description: "With boxing ring and sand bag",
    },
    {
      room_name: "3",
      description: "With hoops and hammock",
    },
    {
      room_name: "4"
    },
  ]);
};
