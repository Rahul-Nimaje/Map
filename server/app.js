const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

const port = 3001;
app.use(cors());
app.use("/login", require("./Routes/loginroutes"));
app.use("/form", require("./Routes/formroutes"));
app.use("/public", express.static(__dirname + "/public"));

mongoose
  .connect("mongodb://localhost:27017/practical")
  .then(() => console.log("Connection Successfull"))
  .catch((err) => console.log(err));

const projectschema = new mongoose.Schema({
  id: String,
  projecttitle: String,
  projectdescription: String,
  selectedStack: Array,
  createdby: String,
  date: String,
});

const projects = mongoose.model("project", projectschema);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
