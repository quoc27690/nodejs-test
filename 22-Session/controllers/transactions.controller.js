const db = require("../db");
const shortid = require("shortid");

module.exports.index = (req, res) => {
  // Lấy số trang về
  var page = parseInt(req.query.page) || 1; // n
  var perPage = 3; // x
  var numberPage = Math.ceil(db.get("transactions").value().length / perPage)

  var start = (page - 1) * perPage;
  var end = page * perPage;

  res.render("transactions/index", {
    transactions: db.get("transactions").value().slice(start,end),
    page: page,
    numberPage: numberPage
  });
};

module.exports.create = (req, res) => {
  res.render("transactions/create", {
    users: db.get("users").value(),
    books: db.get("books").value(),
  });
};

module.exports.edit = (req, res) => {
  var id = req.params.id;
  var transaction = db.get("transactions").find({ id: id }).value();
  res.render("transactions/edit", {
    transaction: transaction,
    users: db.get("users").value(),
    books: db.get("books").value(),
  });
};

module.exports.delete = (req, res) => {
  var id = req.params.id;
  db.get("transactions").remove({ id: id }).write();
  res.redirect("/transactions");
};

module.exports.complete = (req, res) => {
  var id = req.params.id;
  db.get("transactions")
    .find({ id: id })
    .assign({
      isComplete: true,
    })
    .write();
  res.redirect("/transactions");
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  req.body.isComplete = false;
  db.get("transactions").push(req.body).write();
  res.redirect("/transactions");
};

module.exports.postEdit = (req, res) => {
  db.get("transactions")
    .find({ id: req.body.id })
    .assign({
      userName: req.body.userName,
      bookTitle: req.body.bookTitle,
    })
    .write();
  res.redirect("/transactions");
};
