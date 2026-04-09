const logger = require("../utils/logger")

const uploadMedia = async(req, res) => {
  logger.info("Starting media uploading")
  try {
    if(!req.file) {
      logger.error("No file found. Please add a file and try again!")
      return res.status(400).json({
        success: false,
        message: "No file found. Please add a file and try again!"
      })
    }

    const {originalName, mimeType, buffer} = req.file
  } catch(e) {

  }
};