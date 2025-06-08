const canActivate = (...rolesAllowed) => {
  return (request, response, next) => {
    const { roles } = response.locals.payload;

    const userAuthorizated = roles.some((role) => rolesAllowed.includes(role));

    if (userAuthorizated) {
      next();
    } else {
      const error = new Error("User not authorized");
      error.status = 401;
      next(error);
    }
  };
};

module.exports = {
  canActivate,
};
