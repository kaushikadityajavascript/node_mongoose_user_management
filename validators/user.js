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
    status: Joi.string().valid("active", "inactive").allow(null),
    role_id: Joi.string(),
    email: Joi.string().email().required().empty().messages({
      "string.empty": "email is required",
      "string.email": "email must be a valid email address",
    }),
    password: Joi.string(),
  });
  validateRequest(req, res, next, schema);
};

module.exports = { addSchema };
