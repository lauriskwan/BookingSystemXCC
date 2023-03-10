// Set up Local Strategy

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

module.exports = (passport, knex) => {
  // Sign up
  passport.use(
    "local-signup",
    new LocalStrategy(
      // PassportJS expects username by default, if you're using email instead of username, add usernameField property and set it's value to "email"
      // passReqToCallback allows us to grab inputs other than username and password. For example name, phone and so on
      // { usernameField: "email", passReqToCallback: true } if register using email
      { passReqToCallback: true },
      async (req, username, password, done) => {
        const user_name = req.body.name;
        const gender = req.body.gender;
        const phone_number = req.body.phone_number;
        const email = req.body.email;
        // Check if the user exists in the database
        let user = await knex("user_login").where({ username }).first(); // {id: 1, username..} | undefined
        if (user) {
          // if user exists then don't authenticate the user
          return done(null, false, {
            message: "Username already exists.",
          });
        }

        let salt = 10; // adding random string to make the hash less predictable
        const hash = await bcrypt.hash(password, salt); //hash password

        // Insert general information to users
        let newUser = {
          user_name,
          gender,
          phone_number,
          email,
        };
        const userID = await knex("users").insert(newUser).returning("id");
        const user_id = userID[0]["id"]; // get user_login the foreign key from user.id

        // Insert credentials to user_login
        let newUserLoginInfo = {
          username,
          password: hash,
          user_id,
        };
        const loginID = await knex("user_login")
          .insert(newUserLoginInfo)
          .returning("id"); //[{id: 1}]
        newUserLoginInfo.id = loginID[0]["id"];
        // authenticate user
        return done(null, newUserLoginInfo);
      }
    )
  );

  // Login (user)
  passport.use(
    "local-login",
    new LocalStrategy(
      // { usernameField: "email" },
      async (username, password, done) => {
        // Check if the user exists in the database
        const user = await knex("user_login").where({ username }).first(); // {id: 1, username: a, password: 2@10.....}

        if (!user) {
          // if user does not exists then don't authenticate the user
          return done(null, false, {
            message: "Username does not exist.",
          });
        }
        // hashing the entered password and comparing with the hash password from the database
        const result = await bcrypt.compare(password, user.password);
        const type = "user";
        return result
          ? done(null, {user, type})
          : done(null, false, { message: "Incorrect username or password." });
      }
    )
  );

  // Login (instructor)
  passport.use(
    "local-login-instructor",
    new LocalStrategy(
      // { usernameField: "email" },
      async (username, password, done) => {
        // Check if the user exists in the database
        const user = await knex("instructor_login").where({ username }).first(); // {id: 1, username: a, password: 2@10.....}

        if (!user) {
          // if user does not exists then don't authenticate the user
          return done(null, false, {
            message: "Username does not exist.",
          });
        }

        // bcrypt.compare will not work for instructor as password hashing in excluded from instructor registration process.
        const result = password === user.password;
        const type = "instructor";
        return result
          ? done(null, {user, type})
          : done(null, false, { message: "Incorrect username or password." });
      }
    )
  );
};
