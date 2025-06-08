const Sequelize = require("sequelize");
const { printLog } = require("../shared/helpers");

const connection = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: process.env.MYSQL_DIALECT,
    logging: process.env.MYSQL_LOGGING === 'true' ? (msg) => console.info(`${msg}\n`) : false,
    requestTimeout: process.env.MYSQL_TIMEOUT || 60000,
    dialectOptions: {},
    pool: {
      max: parseInt(process.env.MYSQL_POOL_MAX || 10),
      min: parseInt(process.env.MYSQL_POOL_MIN || 0),
      acquire: parseInt(process.env.MYSQL_POOL_ACQUIRE || 30000),
      idle: parseInt(process.env.MYSQL_POOL_IDLE || 10000),
    },
  }
);

const inicialize = async () => {
  return new Promise((resolve, reject) => {
    connection
      .authenticate()
      .then(() => {
        printLog.info(`Conected to database ${process.env.MYSQL_DATABASE}.`);
        resolve(true);
      })
      .catch((error) => {
        printLog.error(
          `Something went wrong ${process.env.MYSQL_DATABASE}: \n` + error
        );
        reject(error);
      });
  });
};

const closeConnection = async () => {
  try {
    connection && (await connection.close());
  } catch (error) {
    printLog.error(error);
  }
};

const synchronizeModels = async () => {
  if (process.env.MYSQL_SYNCHRONIZE !== 'true') return;
  printLog.info("Synchronizing models please wait...");

  return new Promise((resolve, reject) => {
    const syncOptions = {
      force: false,
      alter: true,
      logging: process.env.MYSQL_SYNCHRONIZE_LOG === 'true' ? console.log : null,
    };

    connection
      .sync(syncOptions)
      .then(() => {
        printLog.info("Models Synchronized");
        resolve(true);
      })
      .catch((error) => {
        printLog.error(`Synchronize error ${error}`);
        reject(error);
      });
  });
};

module.exports = {
  inicialize,
  closeConnection,
  Sequelize,
  connection,
  synchronizeModels,
};
