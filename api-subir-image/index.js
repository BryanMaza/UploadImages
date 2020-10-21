'use strict'

const mongoose = require('mongoose');

var port = process.env.PORT || 3999;

// configuracion de express
var app = require('./app');


app.listen(port, () => console.log('El servidor se esta ejecutando en el puerto 3999'));