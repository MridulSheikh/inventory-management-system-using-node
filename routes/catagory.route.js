const express = require("express");
const router = express.Router();
const catagoryController = require("../controllers/catagory.controller")

router
.route("/")
.post(catagoryController.createCatagory)
.get(catagoryController.getCatagory)

router
.route("/:id")
.get(catagoryController.getCatagoryById)
.patch(catagoryController.updateCatagoryById)
.delete(catagoryController.deleteCatagoryById)

module.exports=router