const Joi = require("joi");

const GET = Joi.object({});

const GETONE = Joi.object({
  id_auto: Joi.number().required(),
});

const CREATE = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  model: Joi.string().optional(),
  year: Joi.number().required(),
  imageUrl: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

const UPDATE = Joi.object({
  id_auto: Joi.number().required(),
  name: Joi.string().required(),
  brand: Joi.string().required(),
  model: Joi.string().optional(),
  year: Joi.number().required(),
  imageUrl: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

const DELETE = Joi.object({
  id_auto: Joi.number().required(),
});

const SEARCH = Joi.object({
  term: Joi.string().empty(""),
  limit: Joi.number().optional(),
});

module.exports = {
  GET,
  GETONE,
  CREATE,
  UPDATE,
  DELETE,
  SEARCH,
};
