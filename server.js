// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const fileUpload = require("express-fileupload");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("Public"));


// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());

// Requiring our routes
require("./Routes/login-api-routes.js")(app);
require("./Routes/chef-api-routes.js")(app);
require("./Routes/html-routes.js")(app);
require("./Routes/team-api-routes.js")(app);
require("./Routes/email-api-routes.js")(app);
require("./Routes/meal-api-routes.js")(app);
require("./Routes/grocery-api-routes")(app);
require("./Routes/garden-api-routes")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
