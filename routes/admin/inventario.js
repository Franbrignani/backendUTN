var express = require('express');
var router = express.Router();
var inventarioModel = require ('../../models/inventarioModel');

/* GET home page. */
router.get('/', async function(req, res, next) {

  var inventario = await inventarioModel.getInventario();

  res.render('admin/inventario',{
    layout:'admin/layout',
    persona: req.session.nombre,
    inventario
  });
});

module.exports = router;