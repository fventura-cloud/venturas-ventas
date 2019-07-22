const express = require('express');
const router = express.Router();

const Prod = require('../models/Prod');  //Prod es para save - update - delete

router.get('/prods/add', function(req, res) {  //url inventada
    res.render("prods/new-prod");
  });

  router.post('/prods/new-prod', async function(req, res) {  //directorio del archivo formulario
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
      await newProd.save();  // *** 1:22:59 ****
      res.send("OK")
    }
  });

  router.get('/prods', function(req, res) {  //url inventada
    res.render("prods/new-prod");
  });

module.exports = router;