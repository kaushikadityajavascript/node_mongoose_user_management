const User = require("../models/User");
const Role = require("../models/Role");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../utils/customError");

const add = async (body, req) => {
  try {
    const userExists = await User.findOne({ email: body.email });
    console.log("🚀 ~ file: userServices.js:9 ~ add ~ userExists:", userExists);
    if (userExists) {
      throw new CustomError(StatusCodes.CONFLICT, "User already exists.");
    }
    // // Check if the specified role_id exists in the Role model
    // const roleExists = await Role.findById(body.role_id);

    // if (!roleExists) {
    //   throw new CustomError(
    //     StatusCodes.BAD_REQUEST,
    //     "Invalid role_id. Role not found."
    //   );
    // }

    const createUser = await User.create(body);
    console.log(
      "🚀 ~ file: userServices.js:20 ~ add ~ createUser:",
      createUser
    );
    return createUser;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const users = await User.find();
    if (!users) {
      throw new CustomError(StatusCodes.BAD_REQUEST, "no user found");
    }
    return users;
  } catch (error) {
    throw error;
  }
};

module.exports = { add, getAll };
