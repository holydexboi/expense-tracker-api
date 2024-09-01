const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const user = require("../src/controller/user");
const auth = require("../src/controller/auth");
require("dotenv").config({ path: ".env" });

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => console.log("Connected!"));
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/user", user);
app.use("/auth", auth);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
