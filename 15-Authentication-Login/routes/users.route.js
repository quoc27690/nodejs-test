var express = require("express");
var router = express.Router();

const usersController = require("../controllers/users.controller");
const usersValidate = require("../validates/users.validate");

router.get("/", usersController.index);

router.get("/search", usersController.search);

router.get("/create", usersController.create);

router.get("/:id/edit", usersController.edit);

router.get("/:id/delete", usersController.delete);

router.post("/create", usersValidate.postCreate, usersController.postCreate);

router.post("/edit", usersController.postEdit);

module.exports = router;
