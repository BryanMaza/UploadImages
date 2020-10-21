'use strict'

var express=require('express');
// importamos el controlador
var ImageController=require('../controllers/image');

// cargamos el router
var router=express.Router();
 

router.post('/subir',ImageController.subirImg);
router.get('/image/:fileName',ImageController.getImg);

module.exports=router;