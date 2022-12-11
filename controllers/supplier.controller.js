const {
  createSupplierService,
  getSupplierService,
  getSupplierByIdService,
  updateSupplierByIdService,
  deleteSupplierByIdService,
} = require("../services/supplier.services");

exports.createSupplier = async (req, res, next) => {
  try {
    const result = await createSupplierService(req.body);
    res.status(200).send({
      status: true,
      message: "sucessfull create supplier",
      body: result,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
};

exports.getSupplier = async (req, res, next) => {
  try {
    const suppliers = await getSupplierService();
    if (suppliers.length === 0) {
      return res.status(400).send({
        status: false,
        message: "suppliers not succesfully get",
      });
    }
    res.status(200).send({
      status: true,
      message: "sucessfull get suppliers",
      body: suppliers,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "suppliers not succesfully get",
    });
  }
};

exports.getSupplierById = async (req, res, next) => {
  try {
    const supplier = await getSupplierByIdService(req.params.id);
    if (!supplier) {
      return res.status(400).send({
        status: false,
        message: "supplier not found",
      });
    }
    res.status(200).send({
      status: true,
      message: "sucessfull get supplier",
      body: supplier,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "supplier not found",
    });
  }
};

exports.updateSupplierById = async (req, res, next) => {
  try {
    const result = await updateSupplierByIdService(req.params.id, req.body);
    if (!result.modifiedCount) {
      return res.status(400).send({
        status: false,
        message: "suppier not updated",
        result,
      });
    }
    res.status(200).send({
      status: true,
      message: "sucessfull update supplier",
      result,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "supplier not updated",
    });
  }
};

exports.deleteSupplierById = async (req, res, next) => {
  try {
    const result = await deleteSupplierByIdService(req.params.id);
    if (!result.deletedCount) {
      return res.status(400).send({
        status: false,
        message: "supplier not deleted",
      });
    }
    res.status(200).send({
      status: true,
      message: "sucessfull delete supplier",
      result,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "supplier not deleted",
    });
  }
};
