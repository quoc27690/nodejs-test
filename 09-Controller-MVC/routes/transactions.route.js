var express = require("express");
var router = express.Router();

const transactionsController = require("../controllers/transactions.controller");

router.get("/", transactionsController.index);

router.get("/create", transactionsController.create);

router.get("/:id/edit", transactionsController.edit);

router.get("/:id/delete", transactionsController.delete);

router.get("/:id/complete", transactionsController.complete);

router.post("/create", transactionsController.postCreate);

router.post("/edit", transactionsController.postEdit);

module.exports = router;
