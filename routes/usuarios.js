const express = require("express");
const multer = require("multer");
const {check} = require('express-validator');
const UsuariosController = require("../controllers/usuarios");
const router = express.Router();
const {validarCampos} = require('../middleware/validar-campos');


router.get("/usuario", UsuariosController.getUsuarios);

router.post("/usuario/crear",
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El email es obliatorio').isEmail(),
    validarCampos

], UsuariosController.crearUsuario);

router.put("/usuario/actualizar/:id",[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio'),
    validarCampos
], 
UsuariosController.actualizarUsuario);


router.delete('/usuario/borrar/:id', UsuariosController.borrarUsuario);


module.exports = router;