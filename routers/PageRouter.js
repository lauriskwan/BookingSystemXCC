class PageRouter {
    constructor(express) {
        this.express = express;
    }

    router() {
        let router = this.express.Router();
        router.get("/", this.homepage.bind(this));
        router.get("/userlogin", this.userLogin.bind(this));
        return router;
    }

    homepage(req, res) {
        console.log("Directing to homepage.");
        res.render("homepage");
    }

    userLogin(req, res) {
        console.log("Directing to user login page.");
        res.render("userLogin");
    }
}

module.exports = PageRouter;