const express = require("express");
const app = express();
const port = 3000;

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] }).write();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) =>
  res.render("index", {
    name: "World",
  })
);

app.get("/user", (req, res) =>
  res.render("user/index", {
    users: db.get("users").value(),
  })
);

app.get("/user/search", (req, res) => {
  var q = req.query.q;
  var matchUsers = users.filter(function (user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("user/index", {
    users: matchUsers,
  });
});

app.get("/user/create", (req, res) => res.render("user/create"));

app.post("/user/create", (req, res) => {
  db.get("users").push(req.body).write();
  res.redirect("/user");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
