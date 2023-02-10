// NPM modules
const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

// Local modules
const PageRouter = require("./routers/PageRouter");
const AuthRouter = require("./routers/AuthRouter");
const setupPassport = require("./setupPassport");

// Set up port
const port = 8080;

// Set up session
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// Set up passport
setupPassport(app, knex, passport);

// Set up root directory
app.use(express.static("public"));

// Set up handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// Set up middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Page router
app.use("/", new PageRouter(express).router());

// Auth router
app.use("/", new AuthRouter(express, passport).router());

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
