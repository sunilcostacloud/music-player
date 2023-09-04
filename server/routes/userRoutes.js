const express = require("express");
const router = express.Router();
const { createUser, loginUser, loginValidation } = require("../controllers/userController");
const multer = require("multer");

// Configure multer for file upload
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

// Define routes
router.post("/create-user", upload.single("avatar"), createUser);
router.post("/login", loginValidation, loginUser);

module.exports = router;
