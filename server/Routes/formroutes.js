const router = require("express").Router();
const { Mongoose } = require("mongoose");
const File = require("../model/form");
const { v4: uuidv4 } = require("uuid");
let multer = require("multer");
const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("File type not accepted (.png, .jpg, .jpeg)"));
    }
  },
});
// router.post("/", upload.array("imagesArray", 8), async (req, res) => {
//     const reqFiles = [];
//     const url = req.protocol + "://" + req.get("host");

//     for (var i = 0; i < req.files; i++) {
//         reqFiles.push(url + "/public/" + req.files[i].filename);
//     }

//     const form = new forms();
//     form.name = req.body.name;
//     form.email = req.body.email;
//     form.address = req.body.address;
//     form.latitude = req.body.latitude;
//     form.longitude = req.body.longitude;
//     form.mobileNumber = req.body.mobileNumber;
//     form.image = req.body.image;
//     form.imagesArray = reqFiles;
//     form
//       .save()
//       .then((result) => {
//         res.status(201).json({
//           message: "Uploaded!",
//           userCreated: {
//             imagesArray: result.imagesArray,
//           },
//         });
//       })
//       .catch((err) => {
//         console.log(err),
//           res.status(500).json({
//             error: err,
//           });
//       });
// });
router.put("/", upload.array("imagesArray", 8), async (req, res, next) => {
  const reqFiles = [];
  console.log("sdsdsds", req.file);
  console.log("dsdsd", req.body.name);
  const url = req.protocol + "://" + req.get("host");
  console.log("rere", req.get("host"));
  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(url + "/public/" + req.files[i].filename);
  }

  console.log("imagefile", reqFiles);

  let username = req.body.name;
  console.log("dsdsada", req.query);
  console.log("imagefile", reqFiles);
  await File.findOneAndUpdate(
    {
      _id: req.query.id,
    },

    {
      name: username,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      imagesArray: reqFiles,
    },
    function (err, data) {
      if (err) {
        console.log(err);
        console.log("dsdsd", req.body.name);
      } else {
        res.send(data);
        console.log("Data Updated Successfully", data);
        return data;
      }
    }
  );

  res.send("alredy item");

  //   console.log(totalqty);
});
router.post("/", upload.array("imagesArray", 8), (req, res, next) => {
  const reqFiles = [];
  console.log("sdsdsds", req.file);
  console.log("dsdsd", req.body.name);
  const url = req.protocol + "://" + req.get("host");
  console.log("rere", req.get("host"));
  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(url + "/public/" + req.files[i].filename);
  }

  //   const user = new File({
  //     // _id: new mongoose.Types.ObjectId(),
  //     name: req.body.name,
  //     imagesArray: reqFiles,
  //   });
  console.log("mobile", req.body.mobileNumber);
  const user = new File();
  user.name = req.body.name;
  user.imagesArray = reqFiles;
  user.email = req.body.email;
  user.address = req.body.address;
  user.latitude = req.body.latitude;
  user.mobileNumber = req.body.mobileNumber;
  user.longitude = req.body.longitude;

  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Uploaded!",
        userCreated: {
          _id: result._id,
          imagesArray: result.imagesArray,
          name: result.name,
          mobileNumber: result.mobileNumber,
        },
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
});
router.get("/", async (req, res) => {
  File.find(
    await function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    }
  );
});
router.delete("/", (req, res) => {
  File.findOneAndDelete({ _id: req.query.id }, (err, Customer) => {
    if (!err) {
      res.json({ msg: "customer deleted", deleted: Customer });
    } else {
      console.log("Error removing :" + err);
    }
  });
});

module.exports = router;
