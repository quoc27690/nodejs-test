var shortid = require("shortid");
const db = require("../db");

module.exports = (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    var sessionId = shortid.generate(); // Phải tạo ra 1 biến chứ nếu ko khi dùng lại "shortid.generate()" sẽ tạo ra 1 biến khác
    res.cookie("sessionId", sessionId, { signed: true });
    db.get('sessions').push({id:sessionId}).write()
  }
  next();
};
