const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "env" });
const { signinValidate, User } = require("../model/user");
const { route } = require("./user");

const router = express.Router();

router.post("/signin", async (req, res) => {
  const validate = signinValidate.validate(req.body);
  if (validate.error) {
    return res.status(400).send(validate?.error?.details[0]?.message);
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send("Invalid email or password");
  }

  const valid = bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(400).send("Invalid email or password");
  }

  res
    .header(
      "x-auth-token",
      jwt.sign({ email, name: user.email, id: user._id }, process.env.JWTKEY)
    )
    .send({ email, name: user.email, id: user._id });
});

module.exports = router;
