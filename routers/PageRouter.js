class PageRouter {
  constructor(express) {
    this.express = express;
  }

  router() {
    let router = this.express.Router();
    router.get("/", this.homepage.bind(this));
    router.get("/userReg", this.registration.bind(this));
    router.get("/logout", this.logout.bind(this));

    router.get("/userlogin", this.userLogin.bind(this));
    router.get("/courseList", this.courseList.bind(this));
    router.get("/courseDetail", this.courseDetail.bind(this));
    router.get("/userProfile", this.userProfile.bind(this));

     router.get("/instructorLogin", this.instructorLogin.bind(this));
     router.get("/instructorManageCourse", this.instructorManageCourse.bind(this));
     router.get("/instructorAddCourse", this.instructorAddCourse.bind(this));
     router.get("/instructorProfile", this.instructorProfile.bind(this));

    return router;
  }

  // general

  homepage(req, res) {
    console.log("Directing to homepage.");
    res.render("homepage", { layout: "loginpage" });
  }

  registration(req, res) {
    console.log("Directing to registration page.");
    res.render("userReg", { layout: "loginpage" });
  }

  logout(req, res) {
    res.redirect("/");
    //res.logOut((err)=>{...})
  }

  // user

  userLogin(req, res) {
    console.log("Directing to user login page.");
    res.render("user/userLogin", { layout: "loginpage" });
  }

  courseList(req, res) {
    console.log("Directing to course list page.");
    res.render("user/courseList");
  }

  courseDetail(req, res) {
    console.log("Directing to course detail page.");
    res.render("user/courseList");
  }

  userCourse(req, res) {
    console.log("Directing to user's course page.");
    res.render("user/myCourse");
  }

  userProfile(req, res) {
    console.log("Directing to user's profile page.");
    res.render("user/userProfile");
  }

  // instructor

  instructorLogin(req, res) {
    console.log("Directing to instructor login page.");
    res.render("instructor/instructorLogin", { layout: "loginpage" });
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
    res.render("user/instructorProfile", { layout: "main_instructor" });
  }
}

module.exports = PageRouter;
