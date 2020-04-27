const db = require("../db");

module.exports.requireClient = (req, res, next) => {
  var user = db.get("users").find({ id: req.cookies.userId }).value();

  if (user.isAdmin === "false") {
    res.render("transactions/index", {
      transactions: db
        .get("transactions")
        .filter({ userName: user.name })
        .value(),
    });
    return;
  }

  next();
};
