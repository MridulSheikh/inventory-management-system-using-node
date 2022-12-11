const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplier.controller")

router
.route("/")
.post(supplierController.createSupplier)
.get(supplierController.getSupplier)

router
.route("/:id")
.get(supplierController.getSupplierById)
.patch(supplierController.updateSupplierById)
.delete(supplierController.deleteSupplierById)

module.exports=router;
