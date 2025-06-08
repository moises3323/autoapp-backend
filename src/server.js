const app = require('./app');
const { database, initialSetup } = require('./bootstrap');
const { printLog } = require('./shared/helpers');

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await database.inicialize();
    await database.synchronizeModels();

    // Solo aquí lanzamos el servidor
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    printLog.error(error);
    database.closeConnection();
    process.exit(1);
  }
})();