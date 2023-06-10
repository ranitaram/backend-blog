const express = require("express");
const multer = require("multer");
const {check} = require('express-validator');
const ArticuloController = require("../controllers/articulo");
const { validarJWT } = require("../middleware/validar-jwt");
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

router.post("/crear",[
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('contenido', 'El contenido es obligatorio').not().isEmpty(),
    validarJWT
], ArticuloController.crear);

// el single se usa para subir solo un archivo
router.post("/subir-imagen/:id", [subidas.single("file0"), validarJWT], ArticuloController.subir);
router.post("/subir-servidor/:id", [subidas.single("file1"), validarJWT], ArticuloController.subirACloudinary);

router.get("/:ultimos?", ArticuloController.listarArticulos);
router.get("/uno/:id", ArticuloController.uno);
router.get("/imagen/:fichero", ArticuloController.imagen);
router.get("/buscar/:busqueda", ArticuloController.buscador);

router.delete("/borrar/:id",[validarJWT], ArticuloController.borrar);

router.put("/actualizar/:id",[validarJWT], ArticuloController.editar);

module.exports = router;