class ServiceRouter {
  constructor(
    express,
    fs,
    uploadDirectory,
    courseService,
    profileService,
    instructorAddCourseService
  ) {
    this.express = express;
    this.fs = fs;
    this.uploadDirectory = uploadDirectory;
    this.courseService = courseService;
    this.profileService = profileService;
    this.instructorAddCourseService = instructorAddCourseService;
  }

  router() {
    let router = this.express.Router();

    //Calendar
    router.get("/calendar", (req, res) => {
      // res.send(req.query.date);
      return this.courseService
      .getCourse(req.query.date)
      .then(data => res.send(data))
    });

    // Edit user profile
    router.post("/profile", (req, res) => {
      return this.profileService
        .updateUser(req.user.id, req.body.email, req.body.phone_number)
        .then(() => {
          this.profileService.displayUser(req.user.id);
        })
        .then((err) => {
          if (err) {
            console.log(err);
          }
          res.status(200);
        });
    });

    // Edit instructor profile
    router.post("/instructor/profile", (req, res) => {
      return this.profileService
        .updateInstructor(req.user.id, req.body.email, req.body.phone_number)
        .then(() => {
          this.profileService.displayInstructor(req.user.id);
        })
        .then(res.status(200));
    });

    // Instructor add course

    router.post("/instructor/add_course", (req, res) => {
      if (req.files === null) {
        return this.instructorAddCourseService
          .addCourse(
            req.user.id,
            req.body.course_name,
            req.body.room_id,
            req.body.description,
            req.body.quota,
            req.body.sport_id,
            req.body.date,
            req.body.time_slot_id
          )
          .then(res.status(200));
        // } else {
        //   console.log(req.files.upload);
      } else {
        var image_path;
        const file = req.files.upload;
        return this.writeFile(
          req.body.date,
          req.body.time_slot_id,
          req.body.room_id,
          file.name,
          file.data
        )
          .then((path) => (image_path = path))
          .then(() => {
            this.instructorAddCourseService.addCourse(
              req.user.id,
              req.body.course_name,
              req.body.room_id,
              req.body.description,
              req.body.quota,
              req.body.sport_id,
              req.body.date,
              req.body.time_slot_id,
              image_path
            );
          })
          .then((msg) => {
            res.status(200).json(msg);
          });
      }
    });

    return router;
  }

  writeFile(date, time, room, name, body) {
    return new Promise((resolve, reject) => {
      // CODE BELOW THIS LINE
      this.fs.writeFileSync(
        this.uploadDirectory +
          "/" +
          date +
          "_" +
          time +
          "_" +
          room +
          "_" +
          name,
        body
      );
      if (
        this.fs.existsSync(
          this.uploadDirectory +
            "/" +
            date +
            "_" +
            time +
            "_" +
            room +
            "_" +
            name
        )
      ) {
        // check if the file exists in the directory "uploaded"
        resolve(
          this.uploadDirectory +
            "/" +
            date +
            "_" +
            time +
            "_" +
            room +
            "_" +
            name
        );
      } else {
        reject("Failed to upload.");
      }
    });
  }
}

module.exports = ServiceRouter;
