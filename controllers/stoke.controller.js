const {
    createStokeService,
    getStokeService,
    getStokeByIdService,
    updateStokeByIdService
  } = require("../services/stoke.services");
  
  exports.createStoke = async (req, res, next) => {
    try {
      const result = await createStokeService(req.body);
      res.status(200).send({
        status: true,
        message: "sucessfull create stoke",
        body: result,
      });
    } catch (error) {
      res.status(400).send({
        status: false,
        message: error.message,
      });
    }
  };
  
  exports.getStoke = async (req, res, next) => {
    try {
      const stokes = await  getStokeService();
      if (stokes.length === 0) {
        return res.status(400).send({
          status: false,
          message: "stokes not succesfully get",
        });
      }
      res.status(200).send({
        status: true,
        message: "stokes get suppliers",
        body: stokes,
      });
    } catch (error) {
      res.status(400).send({
        status: false,
        message: "stokes not succesfully get",
      });
    }
  };
  
  exports.getStokeById = async (req, res, next) => {
    try {
      const stoke = await  getStokeByIdService(req.params.id);
      if (!stoke) {
        return res.status(400).send({
          status: false,
          message: "stoke not found",
        });
      }
      res.status(200).send({
        status: true,
        message: "sucessfull get stoke",
        body: supplier,
      });
    } catch (error) {
      res.status(400).send({
        status: false,
        message: "stoke not found",
      });
    }
  };
  
  exports.updateStokeById = async (req, res, next) => {
    try {
      const result = await  updateStokeByIdService(req.params.id, req.body);
      if (!result.modifiedCount) {
        return res.status(400).send({
          status: false,
          message: "stoke not updated",
          result,
        });
      }
      res.status(200).send({
        status: true,
        message: "sucessfull update stoke",
        result,
      });
    } catch (error) {
      res.status(400).send({
        status: false,
        message: "stoke not updated",
      });
    }
  };
  