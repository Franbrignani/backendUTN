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

router.get('/nuevo', (req, res, next) => {
  res.render('admin/nuevo', {
    layout: 'admin/layout'
  })
});

router.post('/nuevo', async (req, res, next) => {
  try{

    console.log(req.body)

    if (req.body.titulo != "" && req.body.genero != "" && req.body.autor != "") {
      await inventarioModel.insertlibro(req.body);
      res.redirect('/admin/inventario')
    } else {
      res.render('admin/nuevo', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch (error){
    console.log(error)
    res.render('admin/nuevo', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargo el libro'
    })
  }
})

module.exports = router;