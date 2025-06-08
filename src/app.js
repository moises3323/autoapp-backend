const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const pkg = require("../package.json");
const routes = require("./routes");
const { errorHandler } = require("./shared/middlewares");
const { routesSetup } = require("./shared/helpers");
// const { swagger } = require("./swagger/config");

const app = express();
// const { swaggerDocs, swaggerUi } = swagger;
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
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/* Create all routes dynamically */
routesSetup.generateRoutes({ app, routes });
//exception handling
app.use("**", errorHandler.notFound);
app.use(errorHandler.generic);

module.exports = app;
