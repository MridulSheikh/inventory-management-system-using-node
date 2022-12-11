const {
  getProductService,
  createProductService,
  updateProductService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require("../services/product.services");
const Product = require("../models/Product");

exports.getProducts = async (req, res, next) => {
  try {
    let fillters = { ...req.query };
    // {price : {$gt : 21}}
    let fillterString = JSON.stringify(fillters);
    fillterString = fillterString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    fillters = JSON.parse(fillterString);
    const excludeField = ["sort", "limit", "page"];
    excludeField.forEach((field) => delete fillters[field]);
    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      console.log(fields);
      queries.fields = fields;
    }
    if (req.query.limit) {
      queries.limits = req.query.limit;
    }
    if (req.query.page) {
      const { page = 1, limit = 2 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }
    const products = await getProductService(fillters, queries);
    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get data",
      error: error.message,
    });
  }
};

// post product

exports.createProduct = async (req, res, next) => {
  try {
    const results = await createProductService(req.body);
    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: results,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateProductService(id, req.body);
    res.status(200).send({
      body: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldn't update the product",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res) => {
  try {
    const result = await bulkUpdateProductService(req.body);
    res.status(200).send({
      body: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldn't update the product",
      error: error.message,
    });
  }
};

exports.DeleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProductByIdService(id);
    res.status(200).json({
      status: "success",
      message: "Sucessfully deleted product",
      deleteCount: result.deletedCount,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldn't delete product",
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async (req, res) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);
    if (deletedCount) {
      res.status(200).send({
        status: true,
        message: "successfully delete products",
        body: result,
      });
    } else {
      res.status(400).json({
        status: false,
        message: "couldn't delete the products",
        error: error.message,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "couldn't delete the products",
      error: error.message,
    });
  }
};

exports.fileUpload = async (req, res) =>{
  try{
    res.status(200).json(req.file)
  }catch(error){
    
  }
}