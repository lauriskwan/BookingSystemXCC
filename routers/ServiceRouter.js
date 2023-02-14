class ServiceRouter {
  constructor(express, userProfileService) {
    this.express = express;
    this.userProfileService = userProfileService;
  }

  router() {
    let router = this.express.Router();

    router.post("/profile", (req, res) => {
      return this.userProfileService
        .updateUser(req.user.id, req.body.email, req.body.phone_number)
        .then(() => {
          this.userProfileService.display(req.user.id);
        })
        .then(res.status(200))
    });

    return router;
  }
}

module.exports = ServiceRouter;
