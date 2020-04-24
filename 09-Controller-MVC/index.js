const express = require("express");
const app = express();
const port = 3000;

const booksRoutes = require("./routes/books.route");
const usersRoutes = require("./routes/users.route");
const transactionsRoutes = require("./routes/transactions.route");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) =>
  res.render("index", {
    name: "Management",
  })
);

app.use("/books", booksRoutes);
app.use("/users", usersRoutes);
app.use("/transactions", transactionsRoutes);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
