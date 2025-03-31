const { CustomAPIError } = require("../errors/custom-errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  return res.status(500).json({ msg: err.message || 'Something went wrong, please try again' });
};

module.exports = errorHandlerMiddleware;
