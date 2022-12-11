const Stoke = require("../models/Stoke")


exports.createStokeService = async (data) => {
  const result = await Stoke.create(data);
  return result;
};

exports.getStokeService = async () => {
  const stoke = await Stoke.find({});
  return stoke;
};

exports.getStokeByIdService = async (id) => {
  const stoke = await Stoke.findOne({ _id: id });
  return stoke;
};

exports.updateStokeByIdService = async (id, data) => {
  const result = await Stoke.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};