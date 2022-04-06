const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//connect to mongodb atlas
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB atlas");
  })
  .catch((err) => {
    console.log("Error connecting to database" + err);
  });

app.listen(PORT, () => {
  console.log("Server started at PORT", PORT);
});
