var Transaction = require("../models/transaction.model");
var Book = require("../models/book.model");
var User = require("../models/user.model");

module.exports.index = async (req, res) => {
  var transactions = await Transaction.find();

  // Lấy số trang về
  var page = parseInt(req.query.page) || 1; // n
  var perPage = 3; // x
  var numberPage = Math.ceil(transactions.length / perPage);
  var start = (page - 1) * perPage;
  var end = page * perPage;

  res.render("transactions/index", {
    transactions: transactions.slice(start, end),
    numberPage: numberPage,
    page: page,
  });
};


module.exports.create = async (req, res) => {
  var users = await User.find();
  var books = await Book.find();

  res.render("transactions/create", {
    users: users,
    books: books,
  });
};
module.exports.postCreate = async (req, res) => {
  await Transaction.create({
    userName: req.body.userName,
    bookTitle: req.body.bookTitle,
    isComplete: false
  });

  res.redirect("/transactions");
};


module.exports.edit = async (req, res) => {
  var id = req.params.id;

  var transaction = await Transaction.findById({ _id: id });
  var users = await User.find();
  var books = await Book.find();

  res.render("transactions/edit", {
    transaction: transaction,
    users: users,
    books: books,
  });
};
module.exports.postEdit = async (req, res) => {
  var id = req.body.id;

  await Transaction.findByIdAndUpdate(
    { _id: id },
    { userName: req.body.userName, bookTitle: req.body.bookTitle }
  );

  res.redirect("/transactions");
};


module.exports.delete = async (req, res) => {
  var id = req.params.id;

  await Transaction.findByIdAndDelete({ _id: id });

  res.redirect("/transactions");
};


module.exports.complete = async (req, res) => {
  var id = req.params.id;

  await Transaction.findByIdAndUpdate(
    { _id: id },
    { isComplete: true }
  );

  res.redirect("/transactions");
};


