const express = require('express');
const router = express.Router();

router.get('/notes', function(req, res, next) {
    res.send("Notes from database");
    next();
  });

module.exports = router;