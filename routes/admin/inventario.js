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
});

router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;
  await inventarioModel.borrarlibrobyId(id);
  res.redirect('/admin/inventario');
});

router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  console.log(req.params.id);
  var libro = await inventarioModel.getlibrobyId(id);

  res.render('admin/modificar', {
    layout: 'admin/layout',
    libro
  })
});

router.post('/modificar', async (req, res, next) => {
  try{
    var obj = {
      titulo: req.body.titulo,
      genero: req.body.genero,
      autor: req.body.autor
    }
    console.log(obj)
    
    await inventarioModel.modificarlibrobyId(obj, req.body.id);
    res.redirect('/admin/inventario');
  } catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modifico el libro'
    })
  }
})

module.exports = router;