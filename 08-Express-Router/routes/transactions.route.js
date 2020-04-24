var express = require("express");
var router = express.Router();

const db = require("../db");
const shortid = require("shortid");

router.get("/", (req, res) => {
  res.render("transactions/index", {
    transactions: db.get("transactions").value(),
  });
});

router.get("/create", (req, res) => {
  res.render("transactions/create", {
    users: db.get("users").value(),
    books: db.get("books").value(),
  });
});

router.get("/:id/delete", (req, res) => {
  var id = req.params.id;
  db.get("transactions").remove({ id: id }).write();
  res.redirect("/transactions");
});

router.get("/:id/edit", (req, res) => {
  var id = req.params.id;
  var transaction = db.get("transactions").find({ id: id }).value();
  res.render("transactions/edit", {
    transaction: transaction,
    users: db.get("users").value(),
    books: db.get("books").value(),
  });
});

router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("transactions").push(req.body).write();
  res.redirect("/transactions");
});

router.post("/edit", (req, res) => {
  db.get("transactions")
    .find({ id: req.body.id })
    .assign({
      userName: req.body.userName,
      bookTitle: req.body.bookTitle,
    })
    .write();
  res.redirect("/transactions");
});

module.exports = router;
