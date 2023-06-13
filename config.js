require('dotenv').config();

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_API = 'https://api-m.sandbox.paypal.com';

const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY;


module.exports = {
    PAYPAL_CLIENT_ID,
    PAYPAL_SECRET,
    PAYPAL_API,
    STRIPE_PRIVATE_KEY
}