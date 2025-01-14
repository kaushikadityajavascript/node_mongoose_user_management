const SERVICE = require("../services/authServices");
const catchAsync = require("../utils/catchAsync");
const { StatusCodes } = require("http-status-codes");
const { setSuccessResponse } = require("../utils/sendResponse");

const loginController = catchAsync(async (req, res) => {
  const login = await SERVICE.login(req.body);
  if (login) {
    return setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      login,
      "logged in successfully"
    );
  }
});

module.exports = { loginController };
