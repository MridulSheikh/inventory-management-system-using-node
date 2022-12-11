const Category = require("../models/Catagory");

exports.createCatagoryService = async (data) => {
  const result = await Category.create(data);
  return result;
};

exports.getCatagoryService = async () => {
  const catagoires = await Category.find({});
  return catagoires;
};

exports.getCatagoryByIdService = async (id) => {
  const catagory = await Category.findOne({ _id: id });
  return catagory;
};

exports.updateCatagoryByIdService = async (id, data) => {
  const result = await Category.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};

exports.deleteCatagoryByIdService = async (id) => {
  const result = await Category.deleteOne({ _id: id });
  return result;
};
