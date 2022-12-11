const express= require("express")
const router = express.Router()
const productController = require("../controllers/product.controller")
const uploader = require("../middleware/uploader")
const multer = require("multer")
const verifytoken = require("../middleware/verifytoken")
const auth = require("../middleware/auth")

router.post("/file-uploder",uploader.single("image"), productController.fileUpload);

router
.route('/')
.get(productController.getProducts)
.post(verifytoken, auth("admin", "store-manager"), productController.createProduct)

router
.route('/bulk-update')
.patch(productController.bulkUpdateProduct)

router
.route('/bulk-delete')
.delete(productController.bulkDeleteProduct)

router
.route('/:id')
.patch(productController.updateProduct)
.delete(productController.DeleteProductById)

module.exports=router