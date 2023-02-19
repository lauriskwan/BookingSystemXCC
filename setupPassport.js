// Set up passport

module.exports = (app, knex, passport) => {
  app.use(passport.initialize());
  app.use(passport.session());

  // Serialize
  passport.serializeUser((entity, done) => {
    // Send the user id to the session, stored in browser
    done(null, {
      id: entity.user.id,
      type: entity.type,
      password: entity.user.password,
    });
  });

  // Deserialize
  passport.deserializeUser(async (obj, done) => {
    // Take in the id from the session and use the id to verify the user
    switch (obj.type) {
      case "user":
        var id = obj.id;
        const user = await knex("user_login").where({ id }).first();
        user.permission = "user_permission";
        return user && user.password == obj.password
          ? done(null, user)
          : done(null, false);

      case "instructor":
        var id = obj.id;
        const instructor = await knex("instructor_login").where({ id }).first();
        instructor.permission = "instructor_permission";
        return instructor && instructor.password == obj.password
          ? done(null, instructor)
          : done(null, false);
    }
  });

  require("./strategy/local-strategy")(passport, knex);
};

