const express = require("express");
const router = express.Router();
const stokeController = require("../controllers/stoke.controller")


router
.route("/")
.post(stokeController.createStoke)
.get(stokeController.getStoke)

router
.route("/:id")
.get(stokeController.getStokeById)
.patch(stokeController.updateStokeById)


module.exports = router;