class ServiceRouter {
  constructor(express, userProfileService, instructorProfileService) {
    this.express = express;
    this.userProfileService = userProfileService;
    this.instructorProfileService = instructorProfileService;
  }

  router() {
    let router = this.express.Router();

    // Edit user profile
    router.post("/profile", (req, res) => {
      return this.userProfileService
        .updateUser(req.user.id, req.body.email, req.body.phone_number)
        .then(() => {
          this.userProfileService.display(req.user.id);
        })
        .then(res.status(200))
    });

    // Edit instructor profile
    router.post("/instructor/profile", (req, res) => {
      return this.instructorProfileService
        .updateInstructor(req.user.id, req.body.email, req.body.phone_number)
        .then(() => {
          this.instructorProfileService.display(req.user.id);
        })
        .then(res.status(200));
    });

    return router;
  }
}

module.exports = ServiceRouter;
