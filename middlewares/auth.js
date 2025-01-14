const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Token = require("../models/Token");
const CustomError = require("../utils/customError");
const catchAsync = require("../utils/catchAsync");

const config = require("../config/jwtConfig");

const authMiddleware = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (!token) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, "Unauthorized4");
    }
    const decoded = jwt.verify(token, config.secretKey);
    const { userId, role_id, email } = decoded;

    const query = {
      _id: userId,
      email,
      is_deleted: false,
    };

    const selectFields = "id email is_deleted";
    console.log(
      "🚀 ~ file: auth.js:26 ~ authMiddleware ~ selectFields:",
      selectFields
    );

    const checkUser = await User.findOne(query).select(selectFields);

    if (!checkUser) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, "Invalid token");
    }

    if (!userId || !role_id || !email) {
      throw new CustomError(StatusCodes.FORBIDDEN, "forbidden");
    }

    const tokenQuery = {
      user_id: checkUser._id,
      type: "Auth",
      token,
    };

    const checkToken = await Token.findOne(tokenQuery);

    if (!checkToken) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, "Unauthorized44");
    }

    req.userId = userId;
    req.roleId = role_id;
    req.email = email;
    next();
  } catch (error) {
    console.log("error", error);
    const find = {
      token,
    };

    const findToken = await Token.findOne(find);

    if (!findToken) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, "Unauthorized444");
    }

    await Token.findByIdAndDelete(findToken._id);

    throw new CustomError(
      StatusCodes.UNAUTHORIZED,
      error.message || "Token has expired"
    );
  }
});

module.exports = authMiddleware;
