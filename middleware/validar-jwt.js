const { response } = require("express");
const jwt = require('jsonwebtoken');


const validarJWT = (req, res = response, next)=> {
    //leer el token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion"
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        //ahora la req.uid va a tener un nuevo uid
        req.uid = uid;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }


    next();
}


module.exports = {
    validarJWT
}