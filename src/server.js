const app = require('./app');
const { database, initialSetup } = require('./bootstrap');
const { printLog } = require('./shared/helpers');

(async () => {
  try {
    await database.inicialize();
    await database.synchronizeModels();

    const port = process.env.PORT || 4000;
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    printLog.error(error);
    database.closeConnection();
    process.exit(1);
  }
})();