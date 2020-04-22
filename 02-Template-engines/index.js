const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) =>
  res.render("index", {
    name: "World",
  })
);

app.get("/user", (req, res) =>
  res.render("user/index", {
    users: [
      { id: 1, name: "Đi chợ" },
      { id: 2, name: "Nấu cơm" },
      { id: 3, name: "Rửa bát" },
      { id: 4, name: "Học code tại CodersX" },
    ],
  })
);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
