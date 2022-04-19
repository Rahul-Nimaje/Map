const router = require("express").Router();
const { Mongoose } = require("mongoose");
const logins = require("../model/login");

router.post("/", async (req, res) => {
  const login = new logins();
  login.username = req.body.username;
  login.password = req.body.password;
  await login.save();
});

module.exports = router;
