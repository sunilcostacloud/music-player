const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDatabase = require("./db/database");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const musicRoutes = require("./routes/musicRoutes");
const cloudinary = require("cloudinary").v2;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use(express.urlencoded({ extended: true }));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to the database
connectDatabase();

// Use the userRoutes and musicRoutes
app.use("/api/users", userRoutes);
app.use("/api/music", musicRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
