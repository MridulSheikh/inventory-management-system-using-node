const {
  createCatagoryService,
  getCatagoryService,
  getCatagoryByIdService,
  updateCatagoryByIdService,
  deleteCatagoryByIdService
} = require("../services/catagory.services");

exports.createCatagory = async (req, res, next) => {
  try {
    const result = await createCatagoryService(req.body);
    res.status(200).send({
      status: true,
      message: "sucessfull create catagory",
      body: result,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "catagory not created",
    });
  }
};

exports.getCatagory = async (req, res, next) => {
  try {
    const catagories = await getCatagoryService();
    res.status(200).send({
      status: true,
      message: "sucessfull get catagories",
      body: catagories,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "catagories not succesfully get",
    });
  }
};

exports.getCatagoryById = async (req, res, next) => {
  try {
    const catagory = await getCatagoryByIdService(req.params.id);
    res.status(200).send({
      status: true,
      message: "sucessfull get catagory",
      body: catagory,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "catagory not found",
    });
  }
};

exports.updateCatagoryById = async (req, res, next) => {
  try {
    const result = await updateCatagoryByIdService(req.params.id, req.body);
    if (!result.modifiedCount) {
      return res.status(400).send({
        status: false,
        message: "catagory not updated",
        result
      });
    }
    res.status(200).send({
      status: true,
      message: "sucessfull update catagory",
      result
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "catagory not updated",
    });
  }
};

exports.deleteCatagoryById = async (req, res, next) => {
    try {
      const result = await deleteCatagoryByIdService(req.params.id);
      res.status(200).send({
        status: true,
        message: "sucessfull delete catagory",
        result
      });
    } catch (error) {
      res.status(400).send({
        status: false,
        message: "catagory not deleted",
      });
    }
  };
