const { singupService, loginService } = require("../services/user.services");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../util/token");
exports.singup = async (req, res) => {
  try {
    const user = await singupService(req.body);
    res.status(200).json({
      stauts: "success",
      message: "Successfully singed up",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "please provide your user credential",
      });
    }
    const user = await loginService(email);

    if (!user) {
      return res.status(401).json({
        stauts: "fail",
        error: "no user found. please create a account",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "fail",
        error: "password not correct",
      });
    }

    if (user.status != "active") {
      return res.status(401).json({
        status: "fail",
        error: "Your account is not active yeat",
      });
    }

    const token = generateToken(user);

    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      stauts: "success",
      message: "Successfully login",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.getme = async (req, res) => {
  try {
    const user = await loginService(req.user?.email)
    const { password: pwd, ...others } = user.toObject();
    res.status(200).json({
        status: "success",
        data: others
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
