var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource data');
});

router.get('/find/:id', function(req, res, next) {
  // res.send(JSON.stringify(req.body));
  res.send(req.params.id)
});

router.get('/search', function(req, res, next) {
  const name = req.query.name;
  const age = req.query.age;

  res.send({name: name, age: age });
});

module.exports = router;
