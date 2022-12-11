const {
  createBrandService,
  getBrandService,
  getBrandByIdService,
  updateBrandByIdService,
} = require("../services/brand.services");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);
    res.status(200).send({
      success: true,
      body: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

exports.getBrand = async (req, res) => {
  try {
    const result = await getBrandService();
    res.status(200).send({
      success: true,
      body: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

exports.getBrandbyId = async (req, res) => {
  try {
    const result = await getBrandByIdService(req.params.id);

    if (!result) {
      return res.status(400).send({
        success: false,
        message: "Not found !",
      });
    }
    res.status(200).send({
      success: true,
      body: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

exports.updateBrandbyId = async (req, res) => {
  try {
    const result = await updateBrandByIdService(req.params.id, req.body);
    if (!result.modifiedCount) {
      return res.status(400).send({
        success: false,
        message: "Brand not updated",
      });
    }
    res.status(200).send({
      success: true,
      message: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
