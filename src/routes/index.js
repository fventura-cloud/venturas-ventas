const express = require('express');
const router = express.Router();

router.get('/', 
function(req, res, next) {
  res.send("Index");
  next();
});

                                                       //QUEDE 30:47

module.exports = router;