const express = require('express');
const router = express.Router();

router.get('/users/signin', function(req, res, next) {
  res.send("Ingresando a la app");
  next();
});

router.get('/users/signup', function(req, res, next) {
  res.send("Formulatio de autenticacion");
  next();
});

module.exports = router;