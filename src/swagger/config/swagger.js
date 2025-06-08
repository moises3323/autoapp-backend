import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import yenv from "yenv";

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

export { swaggerDocs, swaggerUi };
