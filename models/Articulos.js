const {Schema, model} = require("mongoose");

//definir la estructura del modelo
const ArticuloSchema = Schema({
    titulo: {type: String, required: true},
    contenido: {type: String, required: true},
    fecha: {type: Date, default: Date.now},
    categoria: {type: String, required: true},
    imagen: { type: String, default: "default.png"},
});

module.exports = model("Articulo", ArticuloSchema, "articulos");