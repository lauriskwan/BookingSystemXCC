// Requiring modules
const express = require("express");
const { engine } = require("express-handlebars");

// Basic server configuration
const app = express();
app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

const port = 8080;

//
app.get("/", (req, res) => {
  res.render("homepage", { layout: "loginpage" });
});
app.get("/student_login", (req, res) => {
  res.render("student/studentLogin", { layout: "loginpage" });
});
app.get("/instructor_login", (req, res) => {
  res.render("instructor/instructorLogin", { layout: "loginpage" });
});
app.get("/register", (req, res) => {
  res.render("studentReg", { layout: "loginpage" });
});
// Student Page Router
app.get("/student/course_list", (req, res) => {
  res.render("student/courseList");
});
app.get("/student/course_detail", (req, res) => {
  res.render("student/courseDetail");
});
app.get("/student/my_course", (req, res) => {
  res.render("student/myCourse");
});
app.get("/student/profile", (req, res) => {
  res.render("profile");
});
app.get("/logout", (req, res) => {
  res.redirect("/"); //return to homepage
  //res.logOut((err)=>{...})
});
// Instructor Page Router
app.get("/instructor/add_course", (req, res) => {
  res.render("instructor/addCourse", { layout: "main_instructor" });
});
app.get("/instructor/manage_course", (req, res) => {
  res.render("instructor/manageCourse", { layout: "main_instructor" });
});
app.get("/instructor/course_detail", (req, res) => {
  res.render("instructor/courseDetail", { layout: "main_instructor" });
});
app.get("/instructor/profile", (req, res) => {
  res.render("profile", { layout: "main_instructor" });
});
app.get("/logout", (req, res) => {
  res.redirect("/"); //return to homepage
  //res.logOut((err)=>{...})
});

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});