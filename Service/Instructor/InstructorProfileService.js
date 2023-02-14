class InstructorProfileService {
  constructor(knex) {
    this.knex = knex;
  }

  display(instructor_id) {
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

module.exports = InstructorProfileService;
