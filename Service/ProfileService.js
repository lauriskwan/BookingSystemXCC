class ProfileService {
  constructor(knex) {
    this.knex = knex;
  }

  displayUser(user_id) {
    return this.knex("users").select("*").where("id", user_id);
  }

  updateUser(user_id, user_email, user_phone) {
    return this.knex("users")
      .where("id", user_id)
      .update({ email: user_email, phone_number: user_phone });
  }

  displayInstructor(instructor_id) {
    return this.knex("instructors")
      .join(
        "instructor_sports",
        "instructors.id",
        "instructor_sports.instructor_id"
      )
      .join("sports", "instructor_sports.sport_id", "sports.id")
      .select("*")
      .where("instructors.id", instructor_id);
  }

  updateInstructor(instructor_id, instructor_email, instructor_phone) {
    return this.knex("instructors")
      .where("id", instructor_id)
      .update({ email: instructor_email, phone_number: instructor_phone });
  }
}

module.exports = ProfileService