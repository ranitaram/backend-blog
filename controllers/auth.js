const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {
    const {email, password} = req.body;
    try {
        //verificar email
        const usuarioDB = await Usuario.findOne({email});

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            });
        }

        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no es valida'
            });
        }

        //Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ocurrio un error"
        })
    }
}

const googleSingIn = async (req,res = response)=>{
    try {
        const {email, name, picture} = await googleVerify(req.body.token);
        //verificar si el usuario ya existe
        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        }else {
            usuario = usuarioDB;
            usuario.google = true;
        }
        //almacenar al usuario en la base de daos
        await usuario.save();

        //generar JWT
        const token = await generarJWT(usuario.id);


        res.status(200).json({
            ok: true,
            email, 
            name,
            picture,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            msg: 'El token de google no es correcto'
        })
    }
}

module.exports = {
    login,
    googleSingIn
}