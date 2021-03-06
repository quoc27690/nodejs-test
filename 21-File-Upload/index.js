require('dotenv').config()

const express = require("express");
const app = express();
const port = 3000;

var cookieParser = require("cookie-parser");

const booksRoutes = require("./routes/books.route");
const usersRoutes = require("./routes/users.route");
const transactionsRoutes = require("./routes/transactions.route");
const authRoutes = require("./routes/auth.route");

const authMiddleware = require("./middlewares/auth.middleware");
const adminMiddleware = require("./middlewares/admin.middleware");
const clientMiddleware = require("./middlewares/client.middleware");

app.set("view engine", "pug");
app.set("views", "./views");

// Express 4.x API ko cần add "const bodyParser = require('body-parser')"
// Giải thích: Đọc dữ liệu từ client gởi lên và chuyển sang object sau đó lưu vào trong req.body
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));
// package cookie-parser
// app.use(cookieParser('secret'));
// Tạo secret bằng Environment Variables
app.use(cookieParser(process.env.SESSION_SECRET));

app.get("/", (req, res) =>
  res.render("index", {
    name: "Management",
  })
);

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
