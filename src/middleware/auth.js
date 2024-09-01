const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "env" });

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.decode(token, process.env.JWTKEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid User");
  }
}

module.exports = auth;
