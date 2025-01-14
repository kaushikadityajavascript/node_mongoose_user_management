const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const authMiddleware = require("../middlewares/auth");
const { addSchema } = require("../validators/user");

router.post("/users", addSchema, userController.addController);

router.get("/users", authMiddleware, userController.getAllController);

module.exports = router;
