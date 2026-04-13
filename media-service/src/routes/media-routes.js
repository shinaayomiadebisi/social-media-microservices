const express = require("express");
const multer = require("multer");

const { uploadMedia } = require("../controllers/media-controller");
const { authenticateRequest } = require("../middleware/authMiddleware");
const logger = require("../utils/logger");

const router = express.Router();

// configure multer for file upload
const upload = multer({
  storage: multer.memoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single("file");

router.post("/upload", authenticateRequest, (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      logger.error("Multer error while uploading:", err);
    }
  });
});
