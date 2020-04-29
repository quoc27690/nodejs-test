const db = require("../db");

module.exports.requireAdmin = (req, res, next) => {
  var user = db.get("users").find({ id: req.signedCookies.userId }).value();

  if (user.isAdmin === "false") {
    res.render("auth/login", {
      errors: ["Not Admin's Account. Allow to enter Transactions"],
      values: req.body,
    });
    return;
  }

  next();
};
