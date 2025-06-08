import { Router } from "express";
import { autoController } from "../controllers";
import { autoSchema } from "../schemas";
import {
  authentication,
  authorization,
  errorHandler,
  parameterValidator,
  uploadFile,
} from "../shared/middlewares";

const router = Router();

/**
 * @swagger
 * /auto:
 *  get:
 *    summary: "Gets all auto."
 *    description: Gets all the auto registered in the database.
 *    tags: [CLIENTE]
 *    security:
 *        - Bearer: []
 *    parameters:
 *
 *    responses:
 *      200:
 *        description: Ok.
 *      400:
 *        description: Error.
 */
router.get(
  "/",
  //parameterValidator.validateParams(autoSchema.GET),
  errorHandler.asyncError(autoController.get)
);

/**
 * @swagger
 * /auto/search:
 *  get:
 *    summary: "Search auto."
 *    description: Search the auto registered in the database.
 *    tags: [CLIENTE]
 *    security:
 *        - Bearer: []
 *    parameters:
 *
 *    responses:
 *      200:
 *        description: Ok.
 *      400:
 *        description: Error.
 */
router.get(
  "/search",
  parameterValidator.validateParams(autoSchema.SEARCH),
  errorHandler.asyncError(autoController.search)
);

/**
 * @swagger
 * /auto/{id_auto}:
 *  get:
 *    summary: "Gets a auto."
 *    description: Gets a auto by it's id.
 *    tags: [CLIENTE]
 *    security:
 *        - Bearer: []
 *    parameters:
 *      - $ref: "#/parameters/idAuto"
 *    responses:
 *      200:
 *        description: Ok.
 *      400:
 *        description: Error.
 */
router.get(
  "/:id_auto",
  parameterValidator.validateParams(autoSchema.GETONE),
  errorHandler.asyncError(autoController.getOne)
);

/**
 * @swagger
 * /auto/:
 *  post:
 *    summary: "Creates a auto."
 *    description: Creates a auto with the data sent.
 *    tags: [CLIENTE]
 *    security:
 *        - Bearer: []
 *    parameters:
 *      - $ref: "#/parameters/autoCreate"
 *    responses:
 *      200:
 *        description: Ok.
 *      400:
 *        description: Error.
 */
router.post(
  "/",
  parameterValidator.validateParams(autoSchema.CREATE),
  errorHandler.asyncError(autoController.create)
);

/**
 * @swagger
 * /auto/:
 *  put:
 *    summary: "Updates a auto."
 *    description: Updates all the data from a auto with the data sent.
 *    tags: [CLIENTE]
 *    security:
 *        - Bearer: []
 *    parameters:
 *      - $ref: "#/parameters/autoCreateUpdate"
 *    responses:
 *      200:
 *        description: Ok.
 *      400:
 *        description: Error.
 */
router.put(
  "/",
  parameterValidator.validateParams(autoSchema.UPDATE),
  errorHandler.asyncError(autoController.update)
);

/**
 * @swagger
 * /auto/{id_auto}:
 *  delete:
 *    summary: "Deletes a auto."
 *    description: Deletes a auto logically via it's id
 *    tags: [CLIENTE]
 *    security:
 *        - Bearer: []
 *    parameters:
 *      - $ref: "#/parameters/idAuto"
 *    responses:
 *      200:
 *        description: Ok.
 *      400:
 *        description: Error.
 */
router.delete(
  "/:id_auto",
  parameterValidator.validateParams(autoSchema.DELETE),
  errorHandler.asyncError(autoController.deleteOne)
);

export default router;
