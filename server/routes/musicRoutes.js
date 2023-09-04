const express = require("express");
const router = express.Router();
const { uploadMusic } = require("../multer");
const {
    createMusic,
    getMusicByUser,
    editMusic,
    deleteMusic,
    getSingleMusic,
} = require("../controllers/musicController");
const authMiddleware = require("../middlewares/authMiddleware");

// Route for uploading music with authentication middleware
router.post(
    "/upload",
    authMiddleware,
    uploadMusic.single("musicFile"),
    createMusic
);

// Route to get all music uploaded by the authenticated user
router.get("/user-music", authMiddleware, getMusicByUser);

router.get("/:id", authMiddleware, getSingleMusic);

// Route to edit a specific music record (including the music file) by ID
router.put(
    "/edit/:id",
    authMiddleware,
    uploadMusic.single("musicFile"),
    editMusic
);

// Route for deleting a music record by ID
router.delete("/delete/:id", authMiddleware, deleteMusic);

module.exports = router;
