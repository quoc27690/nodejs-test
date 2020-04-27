const express = require("express");
const app = express();
const port = 3000;

const booksRoutes = require("./routes/books.route");
const usersRoutes = require("./routes/users.route");
const transactionsRoutes = require("./routes/transactions.route");
const authRoutes = require("./routes/auth.route");

const authMiddleware = require("./middlewares/auth.middleware");
const adminMiddleware = require("./middlewares/admin.middleware");
const clientMiddleware = require("./middlewares/client.middleware");

// package cookie-parser
var cookieParser = require("cookie-parser");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static("public"));

app.get("/", (req, res) =>
  res.render("index", {
    name: "Management",
  })
);

// package cookie-parser
app.use(cookieParser());

app.use(
  "/books",
  authMiddleware.requireAuth,
  adminMiddleware.requireAdmin,
  booksRoutes
);
app.use(
  "/users",
  authMiddleware.requireAuth,
  adminMiddleware.requireAdmin,
  usersRoutes
);
app.use(
  "/transactions",
  authMiddleware.requireAuth,
  clientMiddleware.requireClient,
  transactionsRoutes
);
app.use("/auth", authRoutes);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
