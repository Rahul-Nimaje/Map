const mongoose = require("mongoose");

const loginschema = new mongoose.Schema({
  username: String,
  password: String,
});
module.exports = mongoose.model("testlogin", loginschema);
