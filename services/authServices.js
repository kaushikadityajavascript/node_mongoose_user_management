const { StatusCodes } = require("http-status-codes");
const CustomError = require("../utils/customError");
const User = require("../models/User");
const Role = require("../models/Role");
const Token = require("../models/Token");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtConfig = require("../config/jwtConfig");
const mongoose = require("mongoose");

const login = async (body) => {
  const { email, password } = body;
  console.log("🚀 ~ file: authServices.js:13 ~ login ~ body:", body);
  try {
    // find the user with the given email, including the associated role
    const checkUser = await User.findOne({
      email,
      //   is_deleted: false,
    });
    //   .populate({
    //   path: "role_id",
    //   //   match: { is_deleted: false },
    //   select: "id name",
    // });
    console.log("🚀 ~ file: authServices.js:23 ~ login ~ checkUser:", User);

    if (!checkUser) {
      throw new CustomError(StatusCodes.NOT_FOUND, "Invalid email or password");
    }
    if (checkUser.status !== "active") {
      throw new CustomError(StatusCodes.NOT_FOUND, "Invalid email or password");
    }

    if (!checkUser.password) {
      throw new CustomError(StatusCodes.NOT_FOUND, "Invalid email or password");
    }
    const passwordIsValid = await bcrypt.compare(password, checkUser.password);
    if (!passwordIsValid) {
      throw new CustomError(StatusCodes.NOT_FOUND, "Incorrect password");
    }
    const accessToken = jwt.sign(
      {
        userId: checkUser.id,
        // role_id: checkUser.role_id.id,
        email: checkUser.email,
      },
      jwtConfig.secretKey,
      { expiresIn: jwtConfig.expiresIn }
    );

    const refreshToken = jwt.sign(
      {
        userId: checkUser.id,
        // role_id: checkUser.role_id.id,
        email: checkUser.email,
      },
      jwtConfig.secretKey,
      {
        expiresIn: jwtConfig.refreshIn,
      }
    );
    if (!accessToken) {
      throw new CustomError(StatusCodes.NOT_FOUND, "Token expired");
    }

    const loginJson = {
      id: checkUser.id,
      first_name: checkUser.first_name,
      last_name: checkUser.last_name,
      email: checkUser.email,
      token: accessToken,
      refreshToken,
      status: checkUser.status,
    };
    const tokenRows = [
      {
        user_id: checkUser.id,
        type: "Auth",
        token: accessToken,
      },
      {
        user_id: checkUser.id,
        type: "RefreshAuth",
        token: refreshToken,
      },
    ];

    // Use Mongoose's create method for bulk insert
    const createTokenRecords = await Token.insertMany(tokenRows);

    if (!createTokenRecords) {
      throw new CustomError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Problem occurred!"
      );
    }

    return loginJson;
  } catch (error) {
    throw error;
  }
};

module.exports = { login };
