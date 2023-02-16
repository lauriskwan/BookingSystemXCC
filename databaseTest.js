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

// knex("instructors")
//   .join(
//     "instructor_sports",
//     "instructors.id",
//     "instructor_sports.instructor_id"
//   )
//   .join("sports", "instructor_sports.sport_id", "sports.id")
//   .select("*")
//   .where("instructors.id", "1")
//   .then((data) => {
//     var sportsArr = [];
//     data.forEach((element) => {
//       if (sportsArr.length == 0) {
//         sportsArr.push(element["sport_name"]);
//       } else {
//         sportsArr.push(" " + element["sport_name"]);
//       }
//     });
//     console.log(sportsArr);
//   });

knex("courses")
  .join("rooms", "courses.room_id", "rooms.id")
  .join("time_slot", "courses.time_slot_id", "time_slot.id")
  .join("sports", "courses.sport_id", "sports.id")
  .select("courses.date", "time_slot.time_slot", "rooms.room_name")
  .where({
    date: "2012-01-31",
    time_slot: "09:00 - 10:00",
    room_name: "4",
  })
  .then((data) => console.log(data[0])); // undefined

knex("courses").insert({
  course_name: "Test",
  quota: "20",
  instructor_id: "1",
  sport_id: "1",
  room_id: "1",
  date: "2020-01-01",
  time_slot_id: "1",
});
