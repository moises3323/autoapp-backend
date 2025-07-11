const yenv = require("yenv");
const { printLog, response } = require("../helpers");
const { v4: uuidv4 } = require("uuid");

const env = yenv();

const notFound = (req, res, next) => {
  // const traceId = generateTrace();
  const error = new Error("Path not found");
  // error.traceId = traceId;
  error.status = 404;
  next(error);
};

const validateError = (err) => {
  //sequelize errors
  if (err?.errors && err?.errors.length) {
    const error = err?.errors[0];
    switch (error.type) {
      case "unique violation":
        err.message = `${error.value} is already in use.`;
        break;

      default:
        break;
    }
  }
  return err;
};

const asyncError = (ftn) => {
  return (req, res, next) => {
    ftn(req, res, next).catch((err) => {
      const traceId = uuidv4();
      printLog.error(err, traceId);
      err = validateError(err);
      let error;
      error = new Error("Async Error");
      error.message = err.message;
      error.stack = err.stack;
      error.status = err.status ?? err.statusCode ?? 400;
      error.traceId = traceId;

      next(error);
    });
  };
};

const generic = (error, req, res, next) => {
  const objError = {
    name: error.name,
    status: error.status ?? error.statusCode ?? 400,
    message: error.message,
  };
  /* enable stack object error */
  if (env.ENABLE_STACK) {
    objError.stack = error.stack;
  }

  res
    .status(objError.status)
    .json(
      response.format({ traceId: error.traceId, name: "Error", data: objError })
    );
};

module.exports = {
  notFound,
  asyncError,
  generic,
};
