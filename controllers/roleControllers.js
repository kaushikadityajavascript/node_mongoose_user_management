const SERVICE = require("../services/roleServices");
const catchAsync = require("../utils/catchAsync");
const { StatusCodes } = require("http-status-codes");
const { setSuccessResponse } = require("../utils/sendResponse");

const addController = catchAsync(async (req, res) => {
  console.log("Full body:", req.body);
  // console.log("Files in req:", req.files);
  const addNew = await SERVICE.add(req.body, req, req.db);
  if (addNew) {
    return setSuccessResponse(res, StatusCodes.CREATED, true, addNew, "");
  }
});

const getAllController = catchAsync(async (req, res) => {
  const getAll = await SERVICE.getAll(req.body);
  if (getAll) {
    return setSuccessResponse(res, StatusCodes.OK, true, getAll, "");
  }
});

const updateByIdController = catchAsync(async (req, res) => {
  const update = await SERVICE.update(req.body, req.params.id);
  if (update) {
    return setSuccessResponse(
      res,
      StatusCodes.CREATED,
      true,
      update,
      "Role updated"
    );
  }
});

module.exports = { addController, updateByIdController, getAllController };
