const db = require("../db");

const bcrypt = require("bcrypt");

module.exports.login = (req, res) => res.render("auth/login");

module.exports.postLogin = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var user = db.get("users").find({ email: email }).value();

  if (!user) {
    res.render("auth/login", {
      errors: ["User does not exist!"],
      values: req.body,
    });
    return;
  }

  var isMatchingPassword = bcrypt.compare(user.password,password,function(err, result) {
    // result == false
});
  if (!isMatchingPassword) {
    res.render("auth/login", {
      errors: ["Wrong password"],
      values: req.body,
    });
    return;
  }

  // Trước khi redirect sẽ set cho 1 cái cookie
  res.cookie("userId", user.id);
  res.redirect("/users");
};
