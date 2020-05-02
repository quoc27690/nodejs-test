var User = require("../models/user.model");

module.exports.requireAdmin = async (req, res, next) => {
  var id = req.signedCookies.userId

  var user = await User.findById({ _id: id });

  if (user.isAdmin === "false") {
    res.render("auth/login", {
      errors: ["Not Admin's Account. Allow to enter Transactions"],
      values: req.body,
    });
    return;
  }

  next();
};
