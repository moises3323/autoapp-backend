//require("../scripts/generateEnvYaml");
const app = require("./app");
const { database, server, initialSetup } = require("./bootstrap");
const { printLog } = require("./shared/helpers");

(async () => {
  try {

    await database.inicialize();
    await server.inicialize(app);
    await database.synchronizeModels();
    //await initialSetup.createRoles();
  } catch (error) {
    printLog.error(error);
    database.closeConnection();
    process.exit(1);
  }
})();
