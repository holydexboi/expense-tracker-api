const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "env" });
const { User, signupValidate } = require("../model/user");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const validate = signupValidate.validate(req.body);

  if (validate.error) {
    return res.status(400).send(validate?.error?.details[0]?.message);
  }

  const { email, password, name } = req.body;
  const salt = 10;
  const newPasword = await bcrypt.hash(password, salt);
  const user = new User({ email, password: newPasword, name });

  await user.save();

  res
    .header(
      "x-auth-token",
      jwt.sign({ email, name, id: user._id }, process.env.JWTKEY)
    )
    .send(user);
});

router.get("/me", async (req, res) => {});

module.exports = router;
