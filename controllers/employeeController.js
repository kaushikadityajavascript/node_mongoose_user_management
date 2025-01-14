const SERVICE = require("../services/employeeService");
const catchAsync = require("../utils/catchAsync");
const { StatusCodes } = require("http-status-codes");
const { setSuccessResponse } = require("../utils/sendResponse");

const addController = catchAsync(async (req, res) => {
  console.log("Full body:", req.body);
  // console.log("Files in req:", req.files);
  const addNew = await SERVICE.add(req.body, req);
  if (addNew) {
    return setSuccessResponse(res, StatusCodes.CREATED, true, addNew, "");
  }
});
const getAllController = catchAsync(async (req, res) => {
  const getAll = await SERVICE.getAll(req.body, req.db);
  if (getAll) {
    return setSuccessResponse(res, StatusCodes.OK, true, getAll, "");
  }
});

const getByIdController = catchAsync(async (req, res) => {
  const getById = await SERVICE.getById(req.params.id);
  if (getById) {
    return setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      getById,
      "employee-fetched"
    );
  }
});

const updateByIdController = catchAsync(async (req, res) => {
  const update = await SERVICE.update(req.body, req.params.id, req, req.db);
  if (update) {
    return setSuccessResponse(
      res,
      StatusCodes.OK,
      true,
      update,
      "Employee updated"
    );
  }
});

module.exports = {
  addController,
  getAllController,
  updateByIdController,
  getByIdController,
};
