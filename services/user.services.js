const User = require("../models/user");

exports.singupService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};

exports.loginService = async (email) => {
  return await User.findOne({ email });
};
