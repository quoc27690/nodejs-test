var express = require("express");
var router = express.Router();

const usersController = require("../controllers/users.controller");

router.get("/", usersController.index);

router.get("/search", usersController.search);

router.get("/create", usersController.create);

router.get("/:id/edit", usersController.edit);

router.get("/:id/delete", usersController.delete);

router.post("/create", usersController.postCreate);

router.post("/edit", usersController.postEdit);

module.exports = router;
