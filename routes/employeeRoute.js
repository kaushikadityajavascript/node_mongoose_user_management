const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const upload = require("../middlewares/uploadFile");
const uploadImage = require("../middlewares/uploadImage");
const authMiddleware = require("../middlewares/auth");
const {
  addSchema,
  updateSchema,
  getByIdSchema,
} = require("../validators/employee");

router.post(
  "/employees",
  authMiddleware,
  addSchema,
  employeeController.addController
);
router.get(
  "/employee/:id",
  getByIdSchema,
  authMiddleware,
  employeeController.getByIdController
);
router.get("/employees", authMiddleware, employeeController.getByIdController);
router.put(
  "/employee/:id",
  updateSchema,
  authMiddleware,
  employeeController.updateByIdController
);

module.exports = router;
