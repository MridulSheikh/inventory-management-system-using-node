const {
  createStoreService,
  getStroeService,
  getStoreByIdService,
  updateStoreByIdService,
  deleteStoreByIdService,
} = require("../services/store.services");

exports.createStore = async (req, res, next) => {
  try {
    const result = await createStoreService(req.body);
    res.status(200).send({
      status: true,
      message: "sucessfull create store",
      body: result,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
};

exports.getStore = async (req, res, next) => {
  try {
    const stores = await getStroeService();
    res.status(200).send({
      status: true,
      message: "sucessfull get stores",
      body: stores,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "stores not succesfully get",
    });
  }
};

exports.getStoreById = async (req, res, next) => {
  try {
    const store = await getStoreByIdService(req.params.id);
    res.status(200).send({
      status: true,
      message: "sucessfull get store",
      body: store,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "store not found",
    });
  }
};

exports.updateStoreById = async (req, res, next) => {
  try {
    const result = await updateStoreByIdService(req.params.id, req.body);
    if (!result.modifiedCount) {
      return res.status(400).send({
        status: false,
        message: "store not updated",
        result,
      });
    }
    res.status(200).send({
      status: true,
      message: "sucessfull update store",
      result,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "store not updated",
    });
  }
};

exports.deleteStoreById = async (req, res, next) => {
  try {
    const result = await deleteStoreByIdService(req.params.id);
    res.status(200).send({
      status: true,
      message: "sucessfull delete store",
      result,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "store not deleted",
    });
  }
};
