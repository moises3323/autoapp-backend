const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const yenv = require("yenv");

const env = yenv();
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "AutoApp",
      description: "AutoApp API Docs",
      // contact: {
      //   name: "Amazing Developer",
      // },
      // servers: ["http://localhost:4000"],
    },
    // host: env.SWAGGER.HOST,
    basePath: env.SWAGGER.BASE_PATH,
    schemes: ["http", "https"],
  },
  apis: [
    "src/routes/*.js",
    "src/swagger/definitions/*.definitions.yaml",
    "src/swagger/parameters/*.parameters.yaml",
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
