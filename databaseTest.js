const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);

knex("users")
        .select("*")
  .then((data) => console.log(data));
