const { Router } = require("express");
const { autoController } = require("../controllers");
const { autoSchema } = require("../schemas");
const {
  authentication,
  authorization,
  errorHandler,
  parameterValidator,
  uploadFile,
} = require("../shared/middlewares");

const router = Router();

router.get(
  "/",
  //parameterValidator.validateParams(autoSchema.GET),
  errorHandler.asyncError(autoController.get)
);

router.get(
  "/search",
  parameterValidator.validateParams(autoSchema.SEARCH),
  errorHandler.asyncError(autoController.search)
);

router.get(
  "/:id_auto",
  parameterValidator.validateParams(autoSchema.GETONE),
  errorHandler.asyncError(autoController.getOne)
);

router.post(
  "/",
  parameterValidator.validateParams(autoSchema.CREATE),
  errorHandler.asyncError(autoController.create)
);

router.put(
  "/",
  parameterValidator.validateParams(autoSchema.UPDATE),
  errorHandler.asyncError(autoController.update)
);

router.delete(
  "/:id_auto",
  parameterValidator.validateParams(autoSchema.DELETE),
  errorHandler.asyncError(autoController.deleteOne)
);

module.exports = router;
