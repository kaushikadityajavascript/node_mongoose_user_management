const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const authMiddleware = require("../middlewares/auth");

router.post("/login", authController.loginController);

module.exports = router;
