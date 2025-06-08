const { database } = require("../bootstrap");

const AutoModel = require("./Auto.model");

const { connection, Sequelize } = database;

const commonFields = {
  createdBy: {
    type: Sequelize.INTEGER,
  },
  updatedBy: {
    type: Sequelize.INTEGER,
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  deletedBy: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  deletedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
};

const db = {
  //users models

  Auto: AutoModel,
};

Object.keys(db).forEach((modelName) => {
  let newModel = db[modelName](connection, Sequelize, commonFields);
  db[modelName] = newModel;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate instanceof Function) {
    db[modelName].associate(db);
  }
});

db.Op = Sequelize.Op;
db.literal = Sequelize.literal;
db.sequelize = connection;
db.Sequelize = Sequelize;

module.exports = db;
