var express = require('express');
var router = express.Router();
const {ResponseFormat} = require('../utils/ResponseFormat');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource data');
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

    return res.json(ResponseFormat(true, 'Record found', {name: name, age: age}));

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
  res.status(200).json(req.body)
});

module.exports = router;
