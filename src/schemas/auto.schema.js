import Joi from "joi";

export const GET = Joi.object({});

export const GETONE = Joi.object({
  id_auto: Joi.number().required(),
});

export const CREATE = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  model: Joi.string().optional(),
  year: Joi.number().required(),
  imageUrl: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

export const UPDATE = Joi.object({
  id_auto: Joi.number().required(),
  name: Joi.string().required(),
  brand: Joi.string().required(),
  model: Joi.string().optional(),
  year: Joi.number().required(),
  imageUrl: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

export const DELETE = Joi.object({
  id_auto: Joi.number().required(),
});

export const SEARCH = Joi.object({
  term: Joi.string().empty(""),
  limit: Joi.number().optional(),
});
