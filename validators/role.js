const Joi = require("joi");
const validateRequest = require("../middlewares/validateRequest");

const addSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .trim()
      .regex(/^[a-zA-Z_ ]+$/)
      .message("Invalid role name. Use letters, underscores, and spaces."),
    status: Joi.string().valid("active", "inactive").allow(null),
  });
  validateRequest(req, res, next, schema);
};
const updateSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .trim()
      .regex(/^[a-zA-Z_ ]+$/)
      .message("Invalid role name. Use letters, underscores, and spaces."),
    status: Joi.string().valid("active", "inactive").allow(null),
  });
  validateRequest(req, res, next, schema);
};

module.exports = { addSchema, updateSchema };
