import express from "express";
import morgan from "morgan";
import cors from "cors"
import pkg from "../package.json";
import * as routes from "./routes";
import { errorHandler } from "./shared/middlewares";
import { routesSetup } from "./shared/helpers";
import { swagger } from "./swagger/config";

const app = express();
const { swaggerDocs, swaggerUi } = swagger;
//middlewares
app.use(morgan("dev"));
app.use(express.json({ extended: true }));
app.use(cors());
/* Set routes */
/* Default route */
app.get("/", (req, res) => {
  res.json({
    name: pkg.name,
    author: pkg.author,
    version: pkg.version,
    description: pkg.description,
  });
});
/* Documentation */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/* Create all routes dynamically */
routesSetup.generateRoutes({ app, routes });
//exception handling
app.use("**", errorHandler.notFound);
app.use(errorHandler.generic);

export default app;
