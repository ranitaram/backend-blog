const {connection} = require("./database/connection");
const express = require("express");
const cors = require("cors");
require('dotenv').config();
//inicializara la app
console.log("App de node arracada");

//conectar a la base de datos
connection();

//crear servidor de node
const app = express();


//configurar el cors
app.use(cors());

//carpeta pública
app.use(express.static('public'));

//convertir el body a objeto js
app.use(express.json());//recibir datos con content.type app/json
app.use(express.urlencoded({extended: true})); //form-urlencoded recibe los datos 

//rutas
const rutas_articulo = require("./routes/articulo");
const rutas_usuarios = require('./routes/usuarios');
const rutas_login = require('./routes/auths');

//cargar rutas
app.use("/api/articulos",rutas_articulo);
app.use('/api/usuarios',rutas_usuarios);
app.use('/api/login',rutas_login);


//crear el servidor y escuchar peticiones
app.listen(process.env.PORT, ()=> {
    console.log('servidor corriendo en el puerto:'+process.env.PORT);
});
