const express = require("express");
const {check} = require('express-validator');
const router = express.Router();
const {validarCampos} = require('../middleware/validar-campos');





module.exports = router