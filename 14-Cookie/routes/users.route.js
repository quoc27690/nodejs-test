var express = require("express");
var router = express.Router();

const usersController = require("../controllers/users.controller");
const usersValidate = require("../validates/users.validate");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware.requireAuth, usersController.index);

router.get("/cookie", (req, res) => {
  res.cookie("user-id", 12345);
  res.send("Hello");
});

router.get("/search", usersController.search);

router.get("/create", usersController.create);

router.get("/:id/edit", usersController.edit);

router.get("/:id/delete", usersController.delete);

router.post("/create", usersValidate.postCreate, usersController.postCreate);

router.post("/edit", usersController.postEdit);

module.exports = router;
