const Sequelize = require("sequelize");
const yenv = require("yenv");
const { printLog } = require("../shared/helpers");

const env = yenv();

const connection = new Sequelize(
  env.DATABASE.MYSQL.DATABASE,
  env.DATABASE.MYSQL.USERNAME,
  env.DATABASE.MYSQL.PASSWORD,
  {
    host: env.DATABASE.MYSQL.HOST,
    port: env.DATABASE.MYSQL.PORT,
    dialect: env.DATABASE.MYSQL.DIALECT,
    logging: env.DATABASE.MYSQL.LOGGING
      ? (msg) => console.info(`${msg}\n`)
      : false,
    requestTimeout: env.DATABASE.MYSQL.TIMEOUT || 60000,
    dialectOptions: {},
    pool: {
      max: env.DATABASE.MYSQL.POOL_MAX,
      min: env.DATABASE.MYSQL.POOL_MIN,
      acquire: env.DATABASE.MYSQL.POOL_ACQUIRE,
      idle: env.DATABASE.MYSQL.POOL_IDLE,
    },
  }
);

const inicialize = async () => {
  return new Promise((resolve, reject) => {
    connection
      .authenticate()
      .then(() => {
        printLog.info(`Conected to database ${env.DATABASE.MYSQL.DATABASE}.`);
        resolve(true);
      })
      .catch((error) => {
        printLog.error(
          `Something went wrong ${env.DATABASE.MYSQL.DATABASE}: \n` + error
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
  if (!env.DATABASE.MYSQL.SYNCHRONIZE) return;
  printLog.info("Synchronizing models please wait...");

  return new Promise((resolve, reject) => {
    const syncOptions = {
      force: false,
      alter: true,
      logging: env.DATABASE.MYSQL.SYNCHRONIZE_LOG ? console.log : null,
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
