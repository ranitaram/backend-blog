const express = require("express");
const {check} = require('express-validator');
const UsuariosController = require("../controllers/usuarios");
const router = express.Router();
const {validarCampos} = require('../middleware/validar-campos');
const { validarJWT } = require("../middleware/validar-jwt");


router.get("/",[validarJWT], UsuariosController.getUsuarios);


router.post("/crear",
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El email es obliatorio').isEmail(),
    validarCampos

], UsuariosController.crearUsuario);

router.put("/actualizar/:id",[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio'),
    validarCampos
], 
UsuariosController.actualizarUsuario);


router.delete('/borrar/:id',[validarJWT], UsuariosController.borrarUsuario);


module.exports = router;