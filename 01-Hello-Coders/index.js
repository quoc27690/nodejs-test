const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("<h1>Hello</h1><a href='/user'>User</a>"));

app.get("/user", (req, res) =>
  res.send(
    "<ul><li>Đi chợ</li><li>Nấu cơm</li><li>Rửa bát</li><li>Học code tại CodersX</li></ul>"
  )
);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
