'use strict'

var express = require('express');
var bodyParser = require('body-parser');


var fileUpload=require('express-fileupload');

var app = express();
app.use(fileUpload());
//Routes
var imgRoutes=require('./routes/subida');

// middleware

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var distDir = __dirname+"/dist/";
app.use(express.static(distDir));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// reescribir y añadir las rutas
app.use('/api',imgRoutes);
// exportamos el modulo
module.exports=app;