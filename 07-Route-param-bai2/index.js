const express = require("express");
const app = express();
const port = 3000;

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

const shortid = require("shortid");

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] }).write();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) =>
  res.render("index", {
    name: "Management",
  })
);

app.get("/books", (req, res) =>
  res.render("books/index", {
    books: db.get("books").value(),
  })
);

app.get("/books/search", (req, res) => {
  var q = req.query.q;
  var matchBooks = db
    .get("books")
    .value()
    .filter(function (book) {
      return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  res.render("books/index", {
    books: matchBooks,
  });
});

app.get("/books/create", (req, res) => res.render("books/create"));

app.get("/books/:id", (req, res) => {
  var id = req.params.id;
  var book = db.get("books").find({ id: id }).value();
  res.render("books/view", {
    book: book,
  });
});

app.get("/books/:id/edit", (req, res) => {
  var id = req.params.id;
  var book = db.get("books").find({ id: id }).value();
  res.render("books/edit", {
    book: book,
  });
});

app.get("/books/:id/delete", (req, res) => {
  var id = req.params.id;
  db.get("books").remove({ id: id }).write();
  res.redirect("/books");
});

app.post("/books/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("books").push(req.body).write();
  res.redirect("/books");
});

app.post("/books/edit", (req, res) => {
  db.get("books")
    .find({ id: req.body.id })
    .assign({ title: req.body.title, description: req.body.description })
    .write();
  res.redirect("/books");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
