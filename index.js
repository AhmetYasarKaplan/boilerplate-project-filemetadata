const express = require("express");
const cors = require("cors");
const bodyParse = require("body-parser");
const multer = require("multer");
const bodyParser = require("body-parser");
require("dotenv").config();

const upload = multer({ dest: "uploads/" });
//Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.

const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  console.log(req.file);

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
