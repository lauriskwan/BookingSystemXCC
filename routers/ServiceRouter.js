class ServiceRouter {
  constructor(express, fs, uploadDirectory, courseService, profileService) {
    this.express = express;
    this.fs = fs;
    this.uploadDirectory = uploadDirectory;
    this.courseService = courseService;
    this.profileService = profileService;
  }

  router() {
    let router = this.express.Router();

    // Calendar
    router.get("/calendar", (req, res) => {
      // res.send(req.query.date);
      return this.courseService
        .getCourse(req.query.date)
        .then((data) => res.send(data));
    });

    // Course quota
    router.get("/quota/:courseID", (req, res) => {
      return this.courseService.getQuota(req.params.courseID).then((data) => {
        res.send(data);
      });
    });

    // Booking
    router.post("/course/book/:courseID", (req, res) => {
      //see if it is member first

      // console.log(req.params.courseID, req.user.id);
      // res.send(req.params.courseID);
      return this.profileService.displayUser(req.user.id).then((data) => {
        if (data[0]["is_member"] === false) {
          res.send("membership expired");
        } else {
          return this.courseService
            .checkBooked(req.user.id, req.params.courseID)
            .then((data) => {
              if (data.length > 0) {
                res.send("already booked");
              } else {
                return this.courseService
                  .book(req.user.id, req.params.courseID)
                  .then(res.send("success"));
              }
            });
        }
      });
    });

    // Cancel booking
    router.delete("/course/cancel/:courseID", (req, res) => {
      return this.courseService
        .cancelBooking(req.params.courseID, req.user.id)
        .then(res.send("cancelled successfully"));
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
        return this.courseService
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
          .then(res.redirect("/instructor/manage_course"));
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
            this.courseService.addCourse(
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
          .then(res.redirect("/instructor/manage_course"));
      }
    });

    // Instructor remove course
    router.delete("/course/remove/:courseID", (req, res) => {
      return this.courseService.getQuota(req.params.courseID).then((data) => {
        if (data[0]["count"] > 0) {
          res.send("users exist");
        } else {
          return this.courseService
            .cancelCourse(req.params.courseID, req.user.id)
            .then(res.send("cancelled successfully"));
        }
      });
    });

    router.delete("/course/remove/confirmed/:courseID", (req, res) => {
      return this.courseService
        .removeUsers(req.params.courseID)
        .then(
          this.courseService
            .cancelCourse(req.params.courseID, req.user.id)
            .then(res.send("cancelled successfully"))
        );
    })

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
        // resolve(
        //   this.uploadDirectory +
        //     "/" +
        //     date +
        //     "_" +
        //     time +
        //     "_" +
        //     room +
        //     "_" +
        //     name
        // );
        resolve(
          "http://localhost:8080/assets/uploadedImages" +
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
