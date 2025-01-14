const fs = require("fs").promises;
const path = require("path");
const os = require("os");
const Employee = require("../models/employee");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../utils/customError");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const { unlink } = require("fs");

const add = async (body, req) => {
  console.log("🚀 ~ file: employeeService.js:10 ~ add ~ body:", body);
  const { work_email, address, ...employeeBody } = body;
  console.log("🚀 ~ file: employeeService.js:11 ~ add ~ ADDRESS:", address);

  const existingEmployee = await Employee.findOne({ work_email });
  if (existingEmployee) {
    throw new CustomError(StatusCodes.CONFLICT, "Employee already exists.");
  }

  const employeeData = {
    ...employeeBody, // Assuming other fields are directly under the body
    work_email,
    address: {
      addressLine1: address?.addressLine1 || "",
      addressLine2: address?.addressLine2 || "",
      zip: address?.zip || "",
      state: address?.state || "",
      city: address?.city || "",
    },
    photo: null, // Set photo to null initially
  };

  // If photo is present in the request, update the employeeData
  // if (req.files) {
  //   employeeData.photo = `uploads/employees/${req.file.filename}`;
  // }

  // create employee
  const createEmployee = await Employee.create(employeeData);

  if (!createEmployee) {
    // unlink(req.file.path);
    throw new CustomError(
      StatusCodes.BAD_REQUEST,
      "Failed to create new employee"
    );
  }
  return createEmployee;
};

const getAll = async () => {
  try {
    const employees = await Employee.find({})
      .populate({
        path: "role_id",
        select: "name", // Specify the fields you want to include from the Role model
      })
      .exec();

    if (!employees) {
      throw new CustomError(StatusCodes.BAD_REQUEST, "no employee found");
    }
    return employees;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  const query = { _id: new ObjectId(id) };

  const findEmployee = await Employee.findOne(query);
  console.log(
    "🚀 ~ file: employeeService.js:74 ~ getById ~ findEmployee:",
    findEmployee
  );
  if (!findEmployee) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Cannot get this employee");
  }

  const employe = findEmployee.toObject();
  // Additional processing specific to the catalog service if needed

  return employe;
};

const update = async (body, id, req) => {};

module.exports = { add, getAll, update, getById };
