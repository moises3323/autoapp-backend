import Joi from "joi";

const mergeParameters = (request) => {
  const properties = ["params", "body", "query"];
  let parameters = {};

  properties.forEach((property) => {
    if (request.hasOwnProperty(property)) {
      const objectRequest = request;
      parameters = { ...objectRequest[property], ...parameters };
    }
  });

  if (
    request.hasOwnProperty("headers") &&
    request.headers.hasOwnProperty("authorization")
  ) {
    parameters = {
      authorization: request.headers.authorization,
      ...parameters,
    };
  }
  return parameters;
};

/**
 *
 * @param {*} schema
 * @returns
 */
export const validateParams = (schema) => {
  return (request, response, next) => {
    const parameters = mergeParameters(request);
    const result = schema
      .append({ authorization: Joi.string() }) //common property for all schemas
      .validate(parameters);

    if (result.hasOwnProperty("error")) {
      const listErrors = [];

      for (const detail of result.error.details) {
        listErrors.push(detail.message);
      }

      if (listErrors.length > 0) {
        const error = new Error("Error in parameters");
        error.status = 411;
        error.message = "Error in parameters";
        error.name = "Error Parameters";
        error.stack = listErrors.join(", ");

        return next(error);
      }
    }

    next();
  };
};
