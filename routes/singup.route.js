const express = require("express");
const userController = require("../controllers/user.controller");
const verifytoken = require("../middleware/verifytoken");
const router = express.Router();

router.post("/singup",userController.singup)
router.post("/login", userController.login)
router.get("/me",verifytoken, userController.getme)

module.exports=router