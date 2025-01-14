const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleControllers");
const { addSchema, updateSchema } = require("../validators/role");
const authMiddleware = require("../middlewares/auth");

router.post("/roles", addSchema, roleController.addController);
router.put(
  "/roles/:id",
  updateSchema,
  authMiddleware,
  roleController.updateByIdController
);
router.get("/roles", authMiddleware, roleController.getAllController);

module.exports = router;
