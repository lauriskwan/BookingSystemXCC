class AuthRouter {
  constructor(express, passport) {
    this.express = express;
    this.passport = passport;
  }

  router() {
    let router = this.express.Router();

    router.post(
      "/signup",
      this.passport.authenticate("local-signup", {
        successRedirect: "/login",
        failureRedirect: "/signup",
        session: false, // prevent auto-login after sign up
      })
    );

    router.post(
      "/login",
      this.passport.authenticate("local-login", {
        successRedirect: "/mycourse",
        failureRedirect: "/login",
      })
    );
    // **Flash Test**//
    // router.post(
    //   "/login",
    //   this.passport.authenticate("local-login", {
    //     successRedirect: "/mycourse",
    //     failureRedirect: "/login",
    //   }), () => {
    //     var
    //   }
    // );

    router.post(
      "/instructor/login",
      this.passport.authenticate("local-login-instructor", {
        successRedirect: "/instructor/manage_course",
        failureRedirect: "/instructor/login",
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
