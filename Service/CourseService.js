class CourseService {
  constructor(knex) {
    this.knex = knex;
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
    })
  }

  book(user_id, course_id) {
    return this.knex("course_users").insert({
      course_id: course_id,
      user_id: user_id,
    });
  }
}

module.exports = CourseService;
