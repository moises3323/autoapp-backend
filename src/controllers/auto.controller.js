const { autoService } = require("../services");
const { response, constants } = require("../shared/helpers");
/* const { schoolDto } = require("../dtos"); */
const { AutoMessages } = require("../shared/messages");

const get = async (req, res) => {
  console.log("get all auto controller");
  const result = await autoService.get();
  res.json(
    response.format({
      name: "get",
      data: result,
      msg: AutoMessages.success.GET_ALL,
    })
  );
};

const getOne = async (req, res) => {
  const idAuto = req.params.id_auto;
  console.log("get by id auto controller: ", idAuto);

  const result = await autoService.getOne(idAuto);
  res.json(
    response.format({
      name: "getOne",
      data: result,
      /* dtoFunction: schoolDto, */ msg: AutoMessages.success.GET_ONE,
    })
  );
};

const create = async (req, res) => {
  let body = req.body;

  const result = await autoService.create(body);
  res.json(
    response.format({
      name: "create",
      data: result,
      /* dtoFunction: schoolDto, */ msg: AutoMessages.success.CREATE,
    })
  );
};

const update = async (req, res) => {
  let body = req.body;

  const result = await autoService.update(body);

  res.json(
    response.format({
      name: "update",
      data: result,
      /* dtoFunction: schoolDto, */ msg: AutoMessages.success.UPDATE,
    })
  );
};

const deleteOne = async (req, res) => {
  const idAuto = req.params.id_auto;
  const result = await autoService.deleteOne(idAuto);

  res.json(
    response.format({
      name: "deleteOne",
      data: result,
      msg: AutoMessages.success.DELETE,
    })
  );
};

const search = async (req, res) => {
  const { query } = req;
  const { term, limit } = query;
  const result = await autoService.search({ term, limit });
  res.json(
    response.format({
      name: "search",
      data: result,
    })
  );
};

module.exports = {
  get,
  getOne,
  create,
  update,
  deleteOne,
  search,
};