const express = require('express');
const router = express.Router();

const Prod = require('../models/Prod');  //Prod es para save - update - delete
const {isAuthenticated} = require('../helpers/auth');

router.get('/prods/add', isAuthenticated, function(req, res) {  //url inventada
    res.render("prods/new-prod");
  });

  router.post('/prods/new-prod', isAuthenticated, async function(req, res) {  //directorio del archivo formulario
    //console.log(req.body);
    const { title, description } = req.body; //para validar si se ingresoo -> express validator
    const errors = [];
    if(!title) {
      errors.push({text: 'Por favor ingrese el titulo'});
    }
    if(!description){
      errors.push({text: 'Por favor ingrese a descripcion'});
    }
    if(errors.length > 0){
      res.render('prods/new-prod', {
        errors,
        title,
        description
      });
    } else{
      // res.send("ok"); //En vez de este. Guardare los datos en la BD.
      const newProd = new Prod({title, description}); //newProd es objeto producto pero no en BD
      newProd.user = req.user.id;  //to relate prod and user
      await newProd.save();  // *** 1:22:59 ****
      req.flash('success_msg', 'Product added succesfully');
      res.redirect('/prods');
    }
      });

router.get('/prods',isAuthenticated, async function(req, res) {  //url inventada
      const productos = await Prod.find({user: req.user.id}).sort({date: 'desc'});
      //console.log({productos})   **funciona**
      res.render('prods/all-prods', { productos });
      //res.send("Probando... Probando");
   });

   router.get('/prods/edit/:id', isAuthenticated, async function(req,res){
     const prodEdit= await Prod.findById(req.params.id);
     res.render('prods/edit-prod', {prodEdit});
   })

   router.put('/prods/edit-prod/:id', isAuthenticated, async function(req,res){      //Done also using AJAX
    const {title, description} = req.body;
    await Prod.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Product updated succesfully'); //ver Global Variables in index.js
    res.redirect('/prods');
  });

  router.delete('/prods/delete/:id', isAuthenticated, async function(req,res){
    await Prod.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Product deleted succesfully');
    //console.log(req.params.id)
    res.redirect('/prods');
  });

module.exports = router;