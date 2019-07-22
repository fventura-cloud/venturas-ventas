const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send("Index");
  next();
});

router.get('/about', function(req, res, next) {
  res.send("About");
  next();
});


module.exports = router;