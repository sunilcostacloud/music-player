const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Helper function to hash password
async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// User registration
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (userEmail) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const passwordHash = await hashPassword(password);

      // Create a temporary file from the image buffer
      const tempFilePath = `temp-${Date.now()}.png`;
      fs.writeFileSync(tempFilePath, req.file.buffer);

      // Upload the profile picture to Cloudinary
      const result = await cloudinary.uploader.upload(tempFilePath, {
        folder: "user_avatars", // Set the folder in Cloudinary
      });

      // Delete the temporary file
      fs.unlinkSync(tempFilePath);

      const user = await User.create({
        name,
        email,
        password: passwordHash,
        avatar: result.secure_url, // Save the Cloudinary URL
      });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION,
      });

      const sanitizedUser = {
        ...user.toObject(),
        password: undefined,
        __v: undefined,
      };

      res.status(201).json({
        message: "Registration successful",
        token,
        user: sanitizedUser,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Registration failed", error: error.message });
  }
};


// Other controller functions (login, etc.)
//////////////////// login user //////////////////////////////////////
// Validation rules for login
exports.loginValidation = [
  check("email").isEmail().withMessage("Please enter a valid email"),
  check("password").notEmpty().withMessage("Password is required"),
];

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if the user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    user.password = undefined;
    user.__v = undefined;

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};