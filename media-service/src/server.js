require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const mediaRoutes = require('./routes/media-routes')
const errorHandler = require("./middleware/errorHandler");
const logger = require("./utils/logger");
const express = require('express')

const app = express()

app.use(express.json())
const PORT = process.env.PORT || 3003
// connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info("Connected to mongodb"))
  .catch((e) => logger.error("Mongo connection error", e));