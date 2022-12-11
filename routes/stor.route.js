const express = require("express");
const router = express.Router();
const storeControllers = require("../controllers/stor.controller");

router
  .route("/")
  .get(storeControllers.getStore)
  .post(storeControllers.createStore);

router
  .route("/:id")
  .patch(storeControllers.updateStoreById)
  .delete(storeControllers.deleteStoreById)
  .get(storeControllers.getStoreById);

module.exports = router;
