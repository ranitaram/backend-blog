const express = require("express");
const {check} = require('express-validator');
const router = express.Router();
const AuthController = require('../controllers/auth'); 
const {validarCampos} = require('../middleware/validar-campos');


router.post('/',[
 check('email', 'El email es obligatorio').isEmail(),
 check('password', 'El password es obligatorio').not().isEmpty(),
 validarCampos
],
AuthController.login );

router.post('/google',[
 
 check('token', 'El token de google es obligatorio').not().isEmpty(),
 validarCampos
],
AuthController.googleSingIn );


module.exports = router