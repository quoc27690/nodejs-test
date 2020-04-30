const db = require("../db");

module.exports.addToCart = (req, res) => {
  var bookId = req.params.bookId; // "req.params.bookId" là từ index gọi lên thanh địa chỉ
  var sessionId = req.signedCookies.sessionId; // "req.signedCookies.sessionId" được tạo từ "session.middleware.js"

  if (!sessionId) {
    res.redirect("/books");
    return;
  }

  // var count = db
  //   .get("sessions")
  //   .find({ id: sessionId })
  //   .get("cart." + bookId, 0)
  //   .value();

  // db.get("sessions")
  //   .find({ id: sessionId })
  //   .set("cart." + bookId, count + 1)
  //   .write();

  res.redirect("/books");
};
