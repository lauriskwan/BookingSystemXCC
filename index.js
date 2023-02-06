// Requiring modules
const express = require("express");
const { engine } = require("express-handlebars");

// Basic server configuration
const app = express();
app.use(express.static("public"))

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

const port = 8080;

//
app.get("/", (req, res) => {
    res.render("login")
});

app.listen(port, () => {
    console.log(`Running at port ${port}`);
});