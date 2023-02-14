class PageRouter {
  constructor(express, userProfileService, instructorProfileService) {
    this.express = express;
    this.userProfileService = userProfileService;
    this.instructorProfileService = instructorProfileService;
  }

  router() {
    let router = this.express.Router();

    // Get
    router.get("/", this.homepage.bind(this));
    router.get("/signup", this.registration.bind(this));

    router.get("/login", this.userLogin.bind(this));
    router.get("/mycourse", this.userIsLoggedIn, this.userCourse.bind(this));
    router.get("/course", this.courseList.bind(this));
    router.get("/course/detail", this.courseDetail.bind(this));
    router.get("/profile", this.userProfile.bind(this));

    router.get("/instructor/login", this.instructorLogin.bind(this));
    router.get("/instructor/course", this.instructorCourseList.bind(this));
    router.get(
      "/instructor/manage_course",
      this.instructorIsLoggedIn,
      this.instructorManageCourse.bind(this)
    );
    router.get("/instructor/add_course", this.instructorAddCourse.bind(this));
    router.get("/instructor/profile", this.instructorProfile.bind(this));

    return router;
  }

  // general

  homepage(req, res) {
    console.log("Directing to homepage.");
    res.render("homepage", { layout: "loginpage" });
  }

  registration(req, res) {
    console.log("Directing to registration page.");
    res.render("userReg", { layout: false });
  }

  // user

  userLogin(req, res) {
    console.log("Directing to user login page.");
    res.render("user/userLogin", { layout: "loginpage" });
  }

  userCourse(req, res) {
    console.log("Directing to user's course page.");
    res.render("user/myCourse");
  }

  courseList(req, res) {
    console.log("Directing to course list page.");
    res.render("user/courseList");
  }

  courseDetail(req, res) {
    console.log("Directing to course detail page.");
    res.render("user/courseDetail");
  }

  userProfile(req, res) {
    console.log("Directing to user's profile page.");
    this.userProfileService
      .display(req.user.id)
      .then((data) => {
        res.render("user/userProfile", {
          name: data[0]["name"],
          email: data[0]["email"],
          phone_number: data[0]["phone_number"],
          joined_at: data[0]["joined_at"],
          is_member: data[0]["is_member"],
          expiry: data[0]["expiry"],
        });
      })
      .then(console.log("userProfile@PageRouter"));
  }

  // instructor

  instructorLogin(req, res) {
    console.log("Directing to instructor login page.");
    res.render("instructor/instructorLogin", { layout: "loginpage" });
  }

  instructorCourseList(req, res) {
    console.log("Directing to instructor course list page.");
    res.render("instructor/courseList", { layout: "main_instructor" });
  }

  instructorManageCourse(req, res) {
    console.log("Directing to instructor manage course page.");
    res.render("instructor/manageCourse", { layout: "main_instructor" });
  }

  instructorAddCourse(req, res) {
    console.log("Directing to instructor add course page.");
    res.render("instructor/addCourse", { layout: "main_instructor" });
  }

  instructorProfile(req, res) {
    console.log("Directing to instructor's profile page.");
    this.instructorProfileService.display(req.user.id).then((data) => {
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
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
  }

  userNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect("/course");
  }

  instructorIsLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/instructor/login");
  }

  instructorNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect("/instructor/manage_course");
  }
}

module.exports = PageRouter;
