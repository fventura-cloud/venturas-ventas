const express = require('express');
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');

router.get('/users/signin', function(req, res) {
  res.render("users/signin");
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect:'/prods',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

router.get('/users/signup', function(req, res) {
  res.render("users/signupview");
});

router.post('/users/signupview',  async function(req, res) {
  //res.send("ok");
  const {name, email, password, confirm_password} = req.body;
  const errors = [];
  //console.log(req.body);
  if(name.length <= 0){
    errors.push({text: 'Please insert your name'});
  }
  if (password != confirm_password) {
    errors.push({text: 'Passwords do not match'});
  }
  if (password.length < 4) {
    errors.push({text: 'Password must be at least 4 characters'});
  }
  if (errors.length > 0) {
  res.render("users/signupview", {errors, name, email, password, confirm_password});
  } 
  else {
    const emailUser = await User.findOne({email: email}); //averiguar este email:email
    if(emailUser){
      req.flash('error_msg', 'The email es already in use');
      res.redirect('/users/signup');
    }
    const newUser= new User({name, email, password});
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash('success_msg', 'You are registered');
    res.redirect('/users/signin');
  }
  });
router.get('/users/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;