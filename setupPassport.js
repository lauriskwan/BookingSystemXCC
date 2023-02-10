// Set up passport

module.exports = (app, knex, passport) => {
  app.use(passport.initialize());
  app.use(passport.session());

  // Serialize
  passport.serializeUser((user, done) => {
    // Send the user id to the session, stored in browser
    done(null, user.id);
  });

  // Deserialize
  passport.deserializeUser(async (id, done) => {
    // Take in the id from the session and use the id to verify the user
    const user = await knex("user_login").where({ id }).first();
    const instructor = await knex("instructor_login").where({ id }).first();
    // return user ? done(null, user) : done(null, false);
    // return (user || instructor) ? will not work as if instructor returns true, session cannot deserialize done(null, >> user <<)
    return user
      ? done(null, user)
      : instructor
      ? done(null, instructor)
      : done(null, false);
  });

  require("./strategy/local-strategy")(passport, knex);
};
