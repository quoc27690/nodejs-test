const db = require("../db");
const shortid = require("shortid");


module.exports.index = (req, res) => {
  // Lấy số trang về
  var page = parseInt(req.query.page) || 1; // n
  var perPage = 3; // x
  var numberPage = Math.ceil(db.get("books").value().length / perPage)

  var start = (page - 1) * perPage;
  var end = page * perPage;

  res.render("books/index", {
    books: db.get("books").value().slice(start,end),
    numberPage: numberPage,
    page: page
  });
};


module.exports.search = (req, res) => {
  var q = req.query.q;
  var matchBooks = db
    .get("books")
    .value()
    .filter(function (book) {
      return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  res.render("books/index", {
    books: matchBooks,
    q : q
  });
};


module.exports.create = (req, res) => res.render("books/create");
module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  db.get("books").push(req.body).write();
  res.redirect("/books");
};



module.exports.view = (req, res) => {
  var id = req.params.id;
  var book = db.get("books").find({ id: id }).value();
  res.render("books/view", {
    book: book,
  });
};


module.exports.edit = (req, res) => {
  var id = req.params.id;
  var book = db.get("books").find({ id: id }).value();
  res.render("books/edit", {
    book: book,
  });
};
module.exports.postEdit = (req, res) => {
  db.get("books")
    .find({ id: req.body.id })
    .assign({ title: req.body.title, description: req.body.description })
    .write();
  res.redirect("/books");
};


module.exports.delete = (req, res) => {
  var id = req.params.id;
  db.get("books").remove({ id: id }).write();
  res.redirect("/books");
};

