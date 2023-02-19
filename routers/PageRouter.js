class PageRouter {
  constructor(express, courseService, profileService) {
    this.express = express;
    this.courseService = courseService;
    this.profileService = profileService;
  }

  router() {
    let router = this.express.Router();

    // Get
    router.get("/", this.logOut, this.homepage.bind(this));
    router.get("/signup", this.userNotLoggedIn, this.registration.bind(this));

    router.get("/login", this.userLogin.bind(this));
    router.get("/mycourse", this.userIsLoggedIn, this.userCourse.bind(this));
    router.get("/course", this.userIsLoggedIn, this.courseList.bind(this));
    router.get(
      "/course/detail",
      this.userIsLoggedIn,
      this.courseDetail.bind(this)
    );
    router.get("/profile", this.userIsLoggedIn, this.userProfile.bind(this));

    router.get(
      "/instructor/login",
      this.instructorNotLoggedIn,
      this.instructorLogin.bind(this)
    );
    router.get(
      "/instructor/course",
      this.instructorIsLoggedIn,
      this.instructorCourseList.bind(this)
    );
    router.get(
      "/instructor/manage_course",
      this.instructorIsLoggedIn,
      this.instructorManageCourse.bind(this)
    );
    router.get(
      "/instructor/add_course",
      this.instructorIsLoggedIn,
      this.instructorAddCourse.bind(this)
    );
    router.get(
      "/instructor/profile",
      this.instructorIsLoggedIn,
      this.instructorProfile.bind(this)
    );

    return router;
  }

  // general

  homepage(req, res) {
    res.render("homepage", { layout: "loginpage" });
  }

  registration(req, res) {
    res.render("userReg", { layout: false });
  }

  // user

  userLogin(req, res) {
    res.render("user/userLogin", { layout: "loginpage" });
  }

  userCourse(req, res) {
    this.courseService.userMyCourse(req.user.id).then((data) => {
      console.log(data);
          res.render("user/myCourse", {
            user: req.user.username,
            myCourse: data
          });
    })
  }

  courseList(req, res) {
    res.render("user/courseList");
  }

  courseDetail(req, res) {
    res.render("user/courseDetail");
  }

  userProfile(req, res) {
    this.profileService.displayUser(req.user.id).then((data) => {
      res.render("user/userProfile", {
        name: data[0]["name"],
        email: data[0]["email"],
        phone_number: data[0]["phone_number"],
        joined_at: data[0]["joined_at"],
        is_member: data[0]["is_member"],
        expiry: data[0]["expiry"],
      });
    });
  }

  // instructor

  instructorLogin(req, res) {
    res.render("instructor/instructorLogin", { layout: "loginpage" });
  }

  instructorCourseList(req, res) {
    res.render("instructor/courseList", { layout: "main_instructor" });
  }

  instructorManageCourse(req, res) {
    res.render("instructor/manageCourse", { layout: "main_instructor" });
  }

  instructorAddCourse(req, res) {
    res.render("instructor/addCourse", { layout: "main_instructor" });
  }

  instructorProfile(req, res) {
    this.profileService.displayInstructor(req.user.id).then((data) => {
      var sportsArr = [];
      data.forEach((element) => {
        if (sportsArr.length == 0) {
          sportsArr.push(element["sport_name"]);
        } else {
          sportsArr.push(" " + element["sport_name"]);
        }
      });
      res.render("instructor/instructorProfile", {
        layout: "main_instructor",
        name: data[0]["name"],
        email: data[0]["email"],
        phone_number: data[0]["phone_number"],
        joined_at: data[0]["joined_at"],
        sports: sportsArr,
      });
    });
  }

  // authentication

  userIsLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user.permission === "user_permission") {
        return next();
      } else {
        res.send("Access denied.");
      }
    } else res.redirect("/login");
  }

  userNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect("/course");
  }

  instructorIsLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user.permission === "instructor_permission") {
        return next();
      } else {
        res.send("Access denied.");
      }
    } else res.redirect("/instructor/login");
  }

  instructorNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect("/instructor/manage_course");
  }

  logOut(req, res, next) {
    if (req.isAuthenticated()) {
      return req.logout(function (err) {
        if (err) {
          return err;
        }
        next();
      });
    }
    next();
  }
}

module.exports = PageRouter;
