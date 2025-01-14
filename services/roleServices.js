const Role = require("../models/Role");
const { statusCodes, StatusCodes } = require("http-status-codes");
const CustomError = require("../utils/customError");
const add = async (body, req) => {
  try {
    const roleExists = await Role.findOne({ name: req.body.name });
    if (roleExists) {
      throw new CustomError(
        StatusCodes.CONFLICT,
        "Role with the given name already exists."
      );
    }
    const role = await Role.create(req.body);
    if (!role) {
      throw new CustomError(StatusCodes.BAD_REQUEST, "Failed to create role.");
    }
    return role;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const roles = await Role.find();
    if (!roles) {
      throw new CustomError(StatusCodes.BAD_REQUEST, "no roles found");
    }
    return roles;
  } catch (error) {
    throw error;
  }
};

const update = async (body, id) => {
  const { name, status } = body;

  if (!id) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "'id' is required");
  }

  const checkRole = await Role.findById(id);

  if (!checkRole) {
    throw new CustomError(StatusCodes.NOT_FOUND, `No role found with id ${id}`);
  }

  const updateData = {};
  if (name) updateData.name = name;
  if (status) updateData.status = status;

  const updatedRole = await Role.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updatedRole) {
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "Problem occurred while updating role"
    );
  } else {
    return updatedRole;
  }
};

module.exports = { add, update, getAll };
