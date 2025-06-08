module.exports = {
  parameterValidator: require("./parameterValidator.middleware"),
  errorHandler: require("./errorHandler.middleware"),
  authentication: require("./auth/authentication.middleware"),
  authorization: require("./auth/authorization.middleware"),
  uploadFile: require("./uploadFile.middleware"),
};
