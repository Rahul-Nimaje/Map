const mongoose = require("mongoose");

const formschema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  latitude: Number,
  longitude: Number,
  imagesArray: {
    type: Array,
  },
  mobileNumber: Number,
});
module.exports = mongoose.model("forms", formschema);
