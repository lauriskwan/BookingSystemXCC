/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("time_slot").del();
  await knex("time_slot").insert([
    {
      time_slot: "09:00 - 10:00",
    },
    {
      time_slot: "10:15 - 11:15",
    },
    {
      time_slot: "11:30 - 12:30",
    },
    {
      time_slot: "14:00 - 15:00",
    },
    {
      time_slot: "15:15 - 16:15",
    },
    {
      time_slot: "16:30 - 17:30",
    },
    {
      time_slot: "17:45 - 18:45",
    },
    {
      time_slot: "19:00 - 20:00",
    },
    {
      time_slot: "20:15 - 21:15",
    },
    {
      time_slot: "21:30 - 22:30",
    },
  ]);
};
