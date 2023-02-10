class AuthRouter {
  constructor(express, passport) {
    this.express = express;
    this.passport = passport;
  }

  router() {
    let router = this.express.Router();

    router.post(
      "/userReg",
      this.passport.authenticate("local-signup", {
        successRedirect: "/userlogin",
        failureRedirect: "/userReg",
        session: false, // prevent auto-login after sign up
      })
    );

    router.post(
      "/userlogin",
      this.passport.authenticate("local-login", {
        successRedirect: "/courseList",
        failureRedirect: "/userlogin",
      })
    );

    router.post(
      "/instructorlogin",
      this.passport.authenticate("local-login-instructor", {
        successRedirect: "/instructorManageCourse",
        failureRedirect: "/instructorlogin",
      })
    );

    router.get("/logout", (req, res) => {
      req.logout(function (err) {
        if (err) {
          return err;
        }
        res.redirect("/");
      });
    });

    return router;
  }
}

module.exports = AuthRouter;
