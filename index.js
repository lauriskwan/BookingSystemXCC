// NPM modules
const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const path = require("path")
const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

// Local modules ----------

// Routers
const PageRouter = require("./routers/PageRouter");
const AuthRouter = require("./routers/AuthRouter");
const ServiceRouter = require("./routers/ServiceRouter");

// Services
const CourseService = require("./Service/CourseService");
const courseService = new CourseService(knex);
const ProfileService = require("./Service/ProfileService");
const profileService = new ProfileService(knex);
const InstructorAddCourseService = require("./Service/Instructor/InstructorAddCourseService");
const instructorAddCourseService = new InstructorAddCourseService(knex);


const setupPassport = require("./setupPassport");

// ------------------------

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
app.use(express.static(__dirname + "/public"));

// Set up file upload
app.use(fileUpload());
const uploadDirectory = __dirname + path.sep + "public" + path.sep + "assets" + path.sep + "uploadedImages";

// Set up handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// Set up middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Page router
app.use(
  "/",
  new PageRouter(express, profileService).router()
);

// Auth router
app.use("/", new AuthRouter(express, passport).router());

// Service router
app.use(
  "/",
  new ServiceRouter(
    express,
    fs,
    uploadDirectory,
    courseService,
    profileService,
    instructorAddCourseService
  ).router()
);

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});