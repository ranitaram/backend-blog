const Usuario = require('../models/usuario');
const {response} = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const getUsuarios =async (req,res)=> {
   try {
    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok:true,
        usuarios,
        uid: req.uid

    });
   } catch (error) {
    
   }
}

const crearUsuario = async (req, res = response) => {
    const {email, password, } = req.body;
   

    try {

        const existeEmail = await Usuario.findOne({ email});

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //generar el token
        const token = await generarJWT(usuario.id);

        //guardar usuario
        await usuario.save( );
        res.json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const actualizarUsuario = async (req, res = response)=> {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);

        //si no existe mostramos un error
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario con ese Id",
            })
        }
        //valiodar token y comprobar si es el usuario correcto

        //actualizar el usuario de la base de datos
        const campos = req.body;
        delete campos.password;
        delete campos.google;
        delete campos.email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            uid,
            campos, 
            {new: true} 
            );




        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuario = async (req, res = response)=> {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);

        //si no existe mostramos un error
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario con ese Id",
            })
        }

        await Usuario.findOneAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: "Usuario borrado ",
            id: uid
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Algo fallo"
        });
    }
}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}