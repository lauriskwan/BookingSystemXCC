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
        const name = req.body.name;
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
          name,
          gender,
          phone_number,
          email,
        };
        const userID = await knex("users").insert(newUser).returning("id")[0]["id"]; // get user_login the foreign key from user.id

        // Insert credentials to user_login
        let newUserLoginInfo = {
          username,
          password: hash,
          userID,
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

  // Login
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
        return result
          ? done(null, user)
          : done(null, false, { message: "Incorrect username or password." });
      }
    )
  );
};
