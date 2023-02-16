class InstructorAddCourseService {
    constructor(knex) {
        this.knex = knex
    }

    addCourse(instructor_id, course_name, room_id, description, quota, sport_id, date, time_slot_id, image_path) {
        return this.knex("courses")
        .select("date", "time_slot_id", "room_id")
        .where({
            "date": date,
            "time_slot_id": time_slot_id,
            "room_id": room_id
        })
        .then(data => {
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
                    image_path: image_path
                }).then(() => {
                    return "success"
                })
            }
            return "failed"
        })
    }
}

module.exports = InstructorAddCourseService;