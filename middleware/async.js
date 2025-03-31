const { createCustomError } = require("../errors/custom-errors");

const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log(error.message);
      next(next(createCustomError(error.message, 404)));
    }
  };
};

module.exports = asyncWrapper;
