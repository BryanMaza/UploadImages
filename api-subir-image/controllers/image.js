'use strict'

var fs = require('fs');
var path = require('path');
var controller = {
    
    subirImg: function (req, res) {

        var files = req.files;

        
        if (files == null || files == undefined) {
            return res.status(500).send({
                status: 'Error',
                message: 'No se encuentra el archivo'
            });
        } else {
            const file=files.file
            if(!file.name || file.name.match(/\.(jpg|jpeg|png|svg|gif)$/i)){
                file.mv(`./uploads/imgs/${file.name}`, err => {
                    if (err) return res.status(200).send({
                        message: 'Error al subir la imagen'
                    })
    
                    return res.status(200).send({
                        message: 'File upload'
                    });
                });
            }else{
                return res.status(500).send({
                    status: 'Error',
                    message: file.name+' no es una imagen'
                });

            }
            

        }

    },
    getImg: function (req, res) {

        var file_name = req.params.fileName;

        if (file_name != null) {
            var path_file = `./uploads/imgs/${file_name}`;

            if (fs.existsSync(path_file)) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(500).send({

                    message: "La imagen no  existe"
                });
            }
        } else {
            return res.status(500).send({

                message: "No hay id de la imagen"
            });
        }


    }

}

module.exports = controller;