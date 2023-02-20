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
        "users.user_name",
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
        { column: "time_slot.time_slot", order: "asc" },
      ]);
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

  getQuota(courseID) {
    return this.knex("course_users").count("*").where({ course_id: courseID });
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

  cancelBooking(course_id, user_id) {
    return this.knex("course_users")
      .where({ course_id: course_id }, { user_id: user_id })
      .del();
  }

  userCourseDetail(course_id) {
    return this.knex("courses")
      .join("instructors", "courses.instructor_id", "instructors.id")
      .join("sports", "courses.sport_id", "sports.id")
      .join("rooms", "courses.room_id", "rooms.id")
      .join("time_slot", "courses.time_slot_id", "time_slot.id")
      .select(
        "courses.id",
        "courses.course_name",
        "instructors.name",
        "sports.sport_name",
        "rooms.room_name",
        "courses.description",
        "courses.quota",
        "courses.date",
        "time_slot.time_slot",
        "courses.image_path"
      )
      .where({ "courses.id": course_id });
  }

  // Instructor

  instructorMyCourse(instructor_id) {
    return this.knex("courses")
      .join("instructors", "courses.instructor_id", "instructors.id")
      .join("sports", "courses.sport_id", "sports.id")
      .join("time_slot", "courses.time_slot_id", "time_slot.id")
      .join("rooms", "courses.room_id", "rooms.id")
      .select(
        "courses.id",
        "time_slot.time_slot",
        "courses.course_name",
        "sports.sport_name",
        "instructors.name",
        "courses.date",
        "rooms.room_name"
      )
      .where({ instructor_id: instructor_id })
      .orderBy([
        { column: "courses.date", order: "asc" },
        { column: "time_slot.time_slot", order: "asc" },
      ]);
  }

  addCourse(
    instructor_id,
    course_name,
    room_id,
    description,
    quota,
    sport_id,
    date,
    time_slot_id,
    image_path
  ) {
    return this.knex("courses")
      .select("date", "time_slot_id", "room_id")
      .where({
        date: date,
        time_slot_id: time_slot_id,
        room_id: room_id,
      })
      .then((data) => {
        if (data[0] === undefined) {
          return this.knex("courses").insert({
            course_name: course_name,
            description: description,
            quota: quota,
            instructor_id: instructor_id,
            sport_id: sport_id,
            room_id: room_id,
            date: date,
            time_slot_id: time_slot_id,
            image_path: image_path,
          });
        }
      });
  }

  cancelCourse(course_id, instructor_id) {
    return this.knex("courses")
      .where({ id: course_id }, { instructor_id: instructor_id })
      .del();
  }

  instructorCourseDetail(course_id) {
    return this.knex("courses")
      .join("instructors", "courses.instructor_id", "instructors.id")
      .join("sports", "courses.sport_id", "sports.id")
      .join("rooms", "courses.room_id", "rooms.id")
      .join("time_slot", "courses.time_slot_id", "time_slot.id")
      .select(
        "courses.id",
        "courses.course_name",
        "instructors.name",
        "sports.sport_name",
        "rooms.room_name",
        "courses.description",
        "courses.quota",
        "courses.date",
        "time_slot.time_slot",
        "courses.image_path"
      )
      .where({ "courses.id": course_id });
  }
}

module.exports = CourseService;
