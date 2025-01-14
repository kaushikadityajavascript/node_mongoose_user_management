const Joi = require("joi");
const validateRequest = require("../middlewares/validateRequest");

const addSchema = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string()
      .required()
      .trim()
      .regex(/^[a-zA-Z]+$/)
      .message("invalid first_name"),
    last_name: Joi.string()
      .required()
      .trim()
      .regex(/^[a-zA-Z]+$/)
      .message("invalid last_name"),
    gender: Joi.string().allow(null).allow(""),
    status: Joi.string().valid("active", "inactive").allow(null),
    photo: Joi.string().allow(null).allow(""),
    role_id: Joi.string().required(),
    // is_system_user: Joi.boolean().allow(null).allow(""),
    // latest_resume: Joi.string().allow(null).allow(""),
    work_email: Joi.string().email().required().empty().messages({
      "string.empty": "Work email is required",
      "string.email": "Work email must be a valid email address",
    }),
    address: Joi.object({
      addressLine1: Joi.string().allow(null).allow("").trim(),
      addressLine2: Joi.string().allow(null).allow("").trim(),
      zip: Joi.string().allow(null).allow("").trim(),
      state: Joi.string().allow(null).allow("").trim(),
      city: Joi.string().allow(null).allow("").trim(),
    }).optional(),
  });
  validateRequest(req, res, next, schema);
};

const updateSchema = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string()
      .required()
      .trim()
      .regex(/^[a-zA-Z]+$/)
      .message("invalid first_name"),
    last_name: Joi.string()
      .required()
      .trim()
      .regex(/^[a-zA-Z]+$/)
      .message("invalid last_name"),
    gender: Joi.string().allow(null).allow(""),
    status: Joi.string().valid("active", "inactive").allow(null),
    photo: Joi.string().allow(null).allow(""),
    role_id: Joi.string().required(),
    // is_system_user: Joi.boolean().allow(null).allow(""),
    // latest_resume: Joi.string().allow(null).allow(""),
    work_email: Joi.string().email().required().empty().messages({
      "string.empty": "Work email is required",
      "string.email": "Work email must be a valid email address",
    }),
  });
  validateRequest(req, res, next, schema);
};
const getByIdSchema = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  validateRequest(req, res, next, schema, false, true);
};

module.exports = { addSchema, updateSchema, getByIdSchema };
