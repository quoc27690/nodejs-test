const express = require("express");
const app = express();
const port = 3000;

var users = [
  { id: 1, name: "Đi chợ" },
  { id: 2, name: "Nấu cơm" },
  { id: 3, name: "Rửa bát" },
  { id: 4, name: "Học code tại CodersX" },
];

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
    users: users,
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
  users.push(req.body);
  res.redirect("/user");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
