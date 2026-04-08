var express = require('express');
var router = express.Router();
const { ResponseFormat } = require('../utils/ResponseFormat');
const FileProcessing = require("../utils/FileUpload");

require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = [];

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource data');
});

//! Register user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ username, password: hashedPassword });

  res.json({ message: 'User registered', user: users });
});

router.get('/search', function (req, res, next) {
  try {
    const name = req.query.name ?? null;
    const age = req.query.age ?? null;

    // Validation
    if (!name) {
      return res.status(400).json(ResponseFormat(true, 'Name is required', null));
    }

    if (age && isNaN(age)) {
      return res.status(400).json(ResponseFormat(true, 'Age is required', null));
    }

    return res.status(200).json(ResponseFormat(true, 'Record found', { name: name, age: age }));

  } catch (error) {
    // return res.json(ResponseFormat(true, 'Record found mmmm', {name: null, age: null}));
    next(error); // pass to global error handler
  }
});

router.get('/:id', function (req, res, next) {
  // res.send(JSON.stringify(req.body));
  res.send(req.params.id)
});

router.post('/', function (req, res, next) {
  // const extensions = /jpeg|jpg|png|pdf/;
  // const fileLimits = { fileSize: 2 * 1024 * 1024 }
  const mimeTypes = {
    jpg: "image/jpeg",
    png: "image/png",
    pdf: "application/pdf"
  };

  const fileExtensions = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'];
  const expectedFileSize = 2; //! in Megabytes (MB)

  const uploadImage = FileProcessing("public/uploads", fileExtensions, expectedFileSize);
  uploadImage.single("file")(req, res, function (err) {
    // return
    if (err) {
      return res.status(400).json(ResponseFormat(true, err.message, null));
    }else if (!req.file) {
        return res.status(400).json(
            ResponseFormat(true, "file is required", null)
        );
    }else {
      return res.status(200).json(ResponseFormat(false, "File uploaded successfully", null))
    }
  });
  // res.status(200).json(req.body)
});

module.exports = router;
