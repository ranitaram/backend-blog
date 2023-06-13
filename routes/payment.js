const express = require("express");
const router = express.Router();
const PaymentController = require('../controllers/payment');


router.post('/create-checkout-session', PaymentController.createSession);
router.get('/success', PaymentController.captureOrder);
router.get('/cancel', PaymentController.cancelOrder );


module.exports = router

