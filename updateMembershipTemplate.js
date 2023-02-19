knex("users")
  .update({
    is_member: true,
    expiry: knex.raw(`? + ?::INTERVAL`, [knex.fn.now(), "30 day"]),
  })
  .where({ id: 1 })
  .then((data) => {
    console.log(data);
  });
