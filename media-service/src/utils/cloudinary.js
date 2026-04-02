const cloudinary = require("cloudinary").v2;
const logger = require("./logger");

cloudinary.config({
  cloud_name: "",
  api_key: "",
  api_secret: "",
});
