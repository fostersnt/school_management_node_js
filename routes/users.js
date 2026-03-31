var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource data');
});

router.post('/:id', function(req, res, next) {
  // res.send(JSON.stringify(req.body));
  res.send(req.params.id)
});

module.exports = router;
