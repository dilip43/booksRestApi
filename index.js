const express = require("express");
const app = express();
const mongoose = require("mongoose");
const winston = require("winston");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const bookRoute = require("./routes/book");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extend: true }));

//create a logger
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exception.log" }),
  ],
});

//routes
app.use("/api/books", bookRoute);

//connect to mongodb atlas
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    logger.infor("connected to mongodb atlas");
  })
  .catch((err) => {
    logger.error("something wrong happend");
  });

app.listen(PORT, () => {
  logger.warn(`Server started at PORT ${PORT}`);
});
