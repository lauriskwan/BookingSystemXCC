const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);

// knex("users")
//         .select("*")
//   .then((data) => console.log(data));

// knex("instructors")
//   .join(
//     "instructor_sports",
//     "instructors.id",
//     "instructor_sports.instructor_id"
//   )
//   .select("*")
//   .where("instructors.id", "1")
//   .then((data) => data.forEach((element) => {console.log(element["sport_id"])}));

knex("instructors")
  .join(
    "instructor_sports",
    "instructors.id",
    "instructor_sports.instructor_id"
  )
  .join("sports", "instructor_sports.sport_id", "sports.id")
  .select("*")
  .where("instructors.id", "1")
  .then((data) => {
    var sportsArr = [];
    data.forEach((element) => {
      if (sportsArr.length == 0) {
        sportsArr.push(element["sport_name"]);
      } else {
        sportsArr.push(" " + element["sport_name"]);
      }
    });
    console.log(sportsArr);
  });
