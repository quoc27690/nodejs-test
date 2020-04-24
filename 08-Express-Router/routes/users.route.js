var express = require("express");
var router = express.Router();

const db = require("../db");
const shortid = require("shortid");

router.get("/", (req, res) =>
  res.render("users/index", {
    users: db.get("users").value(),
  })
);

router.get("/search", (req, res) => {
  var q = req.query.q;
  var matchUsers = db
    .get("users")
    .value()
    .filter(function (user) {
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  res.render("users/index", {
    users: matchUsers,
  });
});

router.get("/create", (req, res) => res.render("users/create"));

router.get("/:id/edit", (req, res) => {
  var id = req.params.id;
  var user = db.get("users").find({ id: id }).value();
  res.render("users/edit", {
    user: user,
  });
});

router.get("/:id/delete", (req, res) => {
  var id = req.params.id;
  db.get("users").remove({ id: id }).write();
  res.redirect("/users");
});

router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("users").push(req.body).write();
  res.redirect("/users");
});

router.post("/edit", (req, res) => {
  db.get("users")
    .find({ id: req.body.id })
    .assign({ name: req.body.name })
    .write();
  res.redirect("/users");
});

module.exports = router;
