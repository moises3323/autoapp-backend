const yenv = require("yenv");
const { tokenUtil } = require("../../helpers");

const env = yenv();

const canActivate = (request, response, next) => {
  const authorizationHeader = request?.headers["authorization"];
  if (authorizationHeader) {
    const partsAuthentication = authorizationHeader.split(" ");
    if (partsAuthentication.length > 1) {
      const accessToken = partsAuthentication[1];
      tokenUtil
        .validateAccessToken({
          accessToken,
          secretKey: env.TOKEN.KEYWORD_SECRET,
        })
        .then(
          (payload) => {
            response.locals.payload = payload;
            process.env.USERDATA = JSON.stringify(payload);
            next();
          },
          (error) => {
            const messageError =
              error.status === 401 ? "Invalid token" : "Token expired";
            const err = new Error(messageError);
            err.status = error.status;
            next(err);
          }
        );
    }
  } else {
    const error = new Error("User not authenticated");
    error.status = 401;
    next(error);
  }
};

module.exports = {
  canActivate,
};
