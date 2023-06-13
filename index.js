const {connection} = require("./database/connection");
const express = require("express");
const cors = require("cors");
const request = require('request');
require('dotenv').config();
//inicializara la app
console.log("App de node arracada");

//conectar a la base de datos
connection();

//crear servidor de node
const app = express();


//configurar el cors
app.use(cors());

//paypal
// const CLIENT = 'Afb_xoJrdqtb5Fllm6wFac00ZXlIS9pyTc17QikKV_98JmgYBxqI2mQhBkkq9HfaaFbg2aO3wfVX5EUP';
// const SECRET = 'EJ57WnlMaTsOxYL0BaSCqBFyYK-CBSqXJRXpEUXJ9wY60lCEF9dJdG-YoS66Hev6qPbFlRQbLx0Avhhq';
// const PAYPAL_API = 'https://sandbox.paypal.com';
// const auth = {user: CLIENT, pass: SECRET}

//configuracion de paypal

// const createPayment = (req, res) => {

//     const body = {
//         intent: 'CAPTURE',
//         purchase_units: [{
//             amount: {
//                 currency_code: 'MXN',
//                 value: '2000'
//             }
//         }],
//         application_context: {
//             brand_name: 'ramses.pro',
//             landing_page: 'NO_PREFERENCE',
//             user_action: 'PAY_NOW',
//             return_url: '',
//             cancel_url: ''
//         }
//     }

//     request.post(`${PAYPAL_API}/v2/checkout/orders`, {
//         auth,
//         body,
//         json: true
//     },  (err, response) => {
//         res.json({data: response.body})
//     }
    
//     )
// }

//RUTA DE PAGO PAYPAL
// app.post(`/create-payment`, createPayment)

//carpeta pública
app.use(express.static('public'));

//convertir el body a objeto js
app.use(express.json());//recibir datos con content.type app/json
app.use(express.urlencoded({extended: true})); //form-urlencoded recibe los datos 

//rutas
const rutas_articulo = require("./routes/articulo");
const rutas_usuarios = require('./routes/usuarios');
const rutas_login = require('./routes/auths');
const rutas_payment = require('./routes/payment');



//cargar rutas
app.use("/api/articulos",rutas_articulo);
app.use('/api/usuarios',rutas_usuarios);
app.use('/api/login',rutas_login);
app.use('/api/payment', rutas_payment);




//crear el servidor y escuchar peticiones
app.listen(process.env.PORT, ()=> {
    console.log('servidor corriendo en el puerto:'+process.env.PORT);
});
