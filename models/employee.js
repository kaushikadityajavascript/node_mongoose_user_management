const mongoose = require("mongoose");
const Joi = require("joi");
const { ADDRESS } = require("../utils/DBSchemaTypes");

const employeeSchema = new mongoose.Schema({
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
    validate: {
      validator: async function (value) {
        const role = await mongoose.model("Role").findOne({ _id: value });
        return role !== null;
      },
      message: "Role does not exist.",
    },
  },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  gender: { type: String, required: true },
  address: ADDRESS,
  // latest_resume: String,
  photo: String,
  work_email: { type: String, required: true, unique: true },
  // is_system_user: Boolean,
  // system_user_id: String,
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  is_deleted: Boolean,
});

// JOI validation schema
const employeeValidationSchema = Joi.object({
  role_id: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  gender: Joi.string().required(),
  // latest_resume: Joi.string(),
  photo: Joi.string(),
  work_email: Joi.string().email().required(),
  // is_system_user: Joi.boolean(),
  // system_user_id: Joi.string(),
  status: Joi.string().valid("active", "inactive"),
  is_deleted: Joi.boolean(),
});

// JOI validation function
const validateEmployee = (employee) => {
  return employeeValidationSchema.validate(employee);
};

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
