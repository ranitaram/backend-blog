const {response} = require('express');

require('dotenv').config();
const {STRIPE_PRIVATE_KEY} = require('../config');
const { Stripe } =  require('stripe');
const stripe = new Stripe(STRIPE_PRIVATE_KEY);
// const axios = require('axios');
// const {PAYPAL_API, PAYPAL_CLIENT_ID, PAYPAL_SECRET} = '../config.js';


const createOrder = async (req, res = response) => {

    const baseURL = {
        sandbox: "https://api-m.sandbox.paypal.com",
        production: "https://api-m.paypal.com"
    }

   const auth = {user: process.env.PAYPAL_CLIENT_ID, pass:process.env.PAYPAL_SECRET }

    const order =  {
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'MXN',
                    value: '2000.00'
                }
            },
        ],
        application_context: {
            brand_name: 'ramses.pro',
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: 'http://127.0.0.1:4201/api/payment/capture-order',
            cancel_url: 'http://127.0.0.1:4201/api/payment/cancel-order'
        }
    }

    // const params = new URLSearchParams();
    // params.append('grant_type', 'client_credentials');

    // const {data} = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
    //    auth: {
    //     username: PAYPAL_CLIENT_ID,
    //     password: PAYPAL_SECRET
    //    } 
    // })

    // console.log(data);
    
    // axios.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', order, {

    // })
    return res.json('orden capturada');

//    request.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders`,{
//     auth,
//     order,
//     json: true,
//    },(err, response)=>{
//     res.json({data: response.body})
//    }
//    )



}

const createSession = async (req, res = response) => {

    //MODO DESARROLLO
    // success_url: 'http://localhost:4600/payments/success',
    //cancel_url: 'http://localhost:4600/payments/cancel'


    const session = await  stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    product_data: {
                        name: 'Paquete landingpage',
                        description: '1 sección, Dominio gratis, Enlaces a redes sociales, Icono flotante WhatsApp, Entrega de 1 a 2 días'
                    },
                    currency: 'mxn',
                    unit_amount: 200000
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: 'https://ramses.pro/payments/success',
        cancel_url: 'https://ramses.pro/payments/cancel'
    })

    return res.json(session)
}

const createBasico = async (req, res = response) => {
    const sessionBasico = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    product_data: {
                        name: 'paquete básico',
                        description: 'hasta 3 secciones, contenido SEO, animaciones css, código fuente, respaldos, entrega de 2 a 3 días'
                    },
                    currency: 'mxn',
                    unit_amount: 348000
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: 'https://ramses.pro/payments/success',
        cancel_url: 'https://ramses.pro/payments/cancel'
    })
    return res.json(sessionBasico);
}

const createStandar = async (req, res = response) => {
    const sessionStandar = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    product_data: {
                        name: 'paquete estándar',
                        description: 'hasta 5 secciones, esctructura escalable, componentes especializados, cambiar css de forma dinamica, integracion con google analytics, entrega de 4 a 6 días'
                    },
                    currency: 'mxn',
                    unit_amount: 580000
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: 'https://ramses.pro/payments/success',
        cancel_url: 'https://ramses.pro/payments/cancel'
    })
    return res.json(sessionStandar)
}

const createPremium = async (req, res = response) => {
    const sessionPremium = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    product_data: {
                        name: 'paquete premium',
                        description: 'hasta 10 secciones, rutas hijas, diseño personalizado, 2horas/mes incluidas, integracion a google analytics, entrega de 6 a 10 días'
                    },
                    currency: 'mxn',
                    unit_amount: 928000
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: 'https://ramses.pro/payments/success',
        cancel_url: 'https://ramses.pro/payments/cancel'
    })
    res.json(sessionPremium)
}

const captureOrder = async (req, res = response) => {

}


const cancelOrder = async (req, res = response) => {

}


module.exports = {
    createOrder,
    captureOrder,
    cancelOrder,
    createSession,
    createBasico,
    createStandar,
    createPremium
}