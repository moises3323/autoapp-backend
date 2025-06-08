import app from "./app";
import { database, server, initialSetup } from "./bootstrap";
import { printLog } from "./shared/helpers";

(async () => {
  try {
    await server.inicialize(app);
    await database.inicialize();
    await database.synchronizeModels();
    //await initialSetup.createRoles();
  } catch (error) {
    printLog.error(error);
    database.closeConnection();
    process.exit(1);
  }
})();
