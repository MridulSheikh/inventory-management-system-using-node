const Supplier = require("../models/Suppllier")


exports.createSupplierService = async (data) => {
  const result = await Supplier.create(data);
  return result;
};

exports.getSupplierService = async () => {
  const supplier = await Supplier.find({});
  return supplier;
};

exports.getSupplierByIdService = async (id) => {
  const supplier = await Supplier.findOne({ _id: id });
  return supplier;
};

exports.updateSupplierByIdService = async (id, data) => {
  const result = await Supplier.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};

exports.deleteSupplierByIdService = async (id) => {
  const result = await Supplier.deleteOne({ _id: id });
  return result;
};