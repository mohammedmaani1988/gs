const express = require("express");
//to get information from requests using req.body.id
const bodyParser = require("body-parser");
//
const passport = require("passport");
const admin = require("./src/routes/api/admin");
const org = require("./src/routes/api/organization");
const group = require("./src/routes/api/group");
const activity = require("./src/routes/api/activity");

/**
 * start app
 */
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/***
 * use passport
 */
app.use(passport.initialize());
//passport config
require("./src/config/passport")(passport);
/**
 * use routes
 */
app.use("/admin", admin);
app.use("/org", org);
app.use("/group", group);
app.use("/activity", activity);

app.get("/", (req, res) => res.send("hello world"));
const port = process.env.PORT || 5301;
app.listen(port, () => console.log("server starting on port " + port));
