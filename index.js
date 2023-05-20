const {connection} = require("./database/connection");
const express = require("express");
const cors = require("cors");
//inicializara la app
console.log("App de node arracada");

//conectar a la base de datos
connection();

//crear servidor de node
const app = express();
const port = 4201;

//configurar el cors
app.use(cors());

//convertir el body a objeto js
app.use(express.json());//recibir datos con content.type app/json
app.use(express.urlencoded({extended: true})); //form-urlencoded recibe los datos 

//rutas
const rutas_articulo = require("./routes/articulo");

//cargar rutas
app.use("/api",rutas_articulo);


//crear el servidor y escuchar peticiones
app.listen(port, ()=> {
    console.log('servidor corriendo en el puerto:'+port);
});
