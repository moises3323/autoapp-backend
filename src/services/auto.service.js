const Models = require("../models");
const { preInsert } = require("../shared/helpers");
const { SucursalMessages } = require("../shared/messages");
const { Auto, sequelize, Op } = Models;

//attributes
const attAuto = [
  "id_auto",
  "name",
  "brand",
  "model",
  "year",
  "imageUrl",
  "description",
  "price",
];

async function get() {
    console.log("get all auto service");
  const result = await Auto.findAll({
    where: {
      deleted: false,
    },
    attributes: attAuto,
  });
  return result;
}

async function getOne(id_auto) {
  const result = await Auto.findOne({
    where: {
      id_auto,
      deleted: false,
    },
    attributes: attAuto,
  });
  return result;
}

async function create(body) {
  const result = await Auto.create(body);

  const resultFinal = await Auto.findOne({
    where: { id_auto: result.dataValues.id_auto, deleted: false },
    attributes: attAuto,
  });

  return resultFinal;
}

async function update(body) {
  const id_auto = body.id_auto;

  await Auto.update(body, {
    where: {
      id_auto,
      deleted: false,
    },
  }).catch((err) => {
    console.log(err);
    throw Error(SucursalMessages.error.UPDATE);
  });

  const result = await Auto.findOne({
    where: {
      id_auto,
      deleted: false,
    },
    attributes: attAuto,
  });
  return result;
}

async function deleteOne(id_auto) {
  //gets common fields for deleting items logically
  const deletingData = preInsert.deleting();
  await sequelize.transaction(async (transaction) => {
    await Auto.update(deletingData, {
      where: {
        id_auto,
        deleted: false,
      },
      transaction,
    }).catch((err) => {
      throw Error(SucursalMessages.error.DELETE);
    });
  });

  return { id_auto };
}

async function search({ term, limit = 10 }) {
  if (!term) return [];
  let whereConditionPersona = {
    [Op.or]: [
      { name: { [Op.like]: "%" + term + "%" } },
      { brand: { [Op.like]: "%" + term + "%" } },
      { model: { [Op.like]: "%" + term + "%" } },
    ],
    deleted: false,
  };

  const result = await Auto.findAll({
    where: {
      deleted: false,
    },
    attributes: attAuto,
    limit: +limit,
  });

  return result;
}

module.exports = {
  get,
  getOne,
  create,
  update,
  deleteOne,
  search,
};
