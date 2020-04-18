var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/testNew', function(req, res, next) {
  res.send("Hello World");
  // res.render('index', { title: 'Express' });
});

module.exports = router;
