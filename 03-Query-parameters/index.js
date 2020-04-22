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

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
