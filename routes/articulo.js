const express = require("express");
const multer = require("multer");
const ArticuloController = require("../controllers/articulo");

const router = express.Router();

//donde voy a guardar las imagenes
const almacenamiento = multer.diskStorage({
    destination: function(req, file, cb){
        //siempre tengo indicar la raiz del proyecto
        cb(null, './imagenes/articulos/');
    },

    filename: function(req, file, cb){
        cb(null, "articulo" + Date.now() + file.originalname);
    },
})

const subidas = multer({storage: almacenamiento});


//ruta de prueba
// router.get("/ruta-de-prueba", ArticuloController.prueba);

router.post("/crear", ArticuloController.crear);

// el single se usa para subir solo un archivo
router.post("/subir-imagen/:id", [subidas.single("file0")], ArticuloController.subir);

router.get("/articulos/:ultimos?", ArticuloController.listarArticulos);
router.get("/articulo/:id", ArticuloController.uno);
router.get("/imagen/:fichero", ArticuloController.imagen);
router.get("/buscar/:busqueda", ArticuloController.buscador);

router.delete("/articulo/:id", ArticuloController.borrar);

router.put("/articulo/:id", ArticuloController.editar);

module.exports = router;