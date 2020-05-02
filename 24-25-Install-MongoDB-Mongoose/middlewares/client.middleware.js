var User = require("../models/user.model");
var Transaction = require("../models/transaction.model");

module.exports.requireClient = async (req, res, next) => {
  var id = req.signedCookies.userId;

  var user = await User.findById({ _id: id });
  var transactions = await Transaction.find({ userName: user.name });

  if (user.isAdmin === "false") {
    res.render("transactions/index", {
      transactions: transactions,
    });
    return;
  }

  next();
};
