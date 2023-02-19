class CourseService {
  constructor(knex) {
    this.knex = knex;
  }

  userMyCourse(user_id) {
    return this.knex("course_users")
      .join("courses", "course_users.course_id", "courses.id")
      .join("users", "course_users.user_id", "users.id")
      .join("instructors", "courses.instructor_id", "instructors.id")
      .join("sports", "courses.sport_id", "sports.id")
      .join("time_slot", "courses.time_slot_id", "time_slot.id")
      .join("rooms", "courses.room_id", "rooms.id")
      .select(
        "users.name",
        "courses.id",
        "time_slot.time_slot",
        "courses.course_name",
        "sports.sport_name",
        "instructors.name",
        "courses.date",
        "rooms.room_name"
      )
      .where({ user_id: user_id })
      .orderBy([
        { column: "courses.date", order: "asc" },
        { column: "time_slot.time_slot", order: "asc" }
      ])
  }

  getCourse(date) {
    return this.knex("courses")
      .join("instructors", "courses.instructor_id", "instructors.id")
      .join("sports", "courses.sport_id", "sports.id")
      .join("time_slot", "courses.time_slot_id", "time_slot.id")
      .select(
        "courses.id",
        "time_slot.time_slot",
        "courses.course_name",
        "sports.sport_name",
        "instructors.name",
        "courses.quota"
      )
      .where({ date: date })
      .orderBy("time_slot.time_slot", "asc");
  }

  checkBooked(user_id, course_id) {
    return this.knex("course_users").select("*").where({
      course_id: course_id,
      user_id: user_id,
    });
  }

  book(user_id, course_id) {
    return this.knex("course_users").insert({
      course_id: course_id,
      user_id: user_id,
    });
  }
}

module.exports = CourseService;
