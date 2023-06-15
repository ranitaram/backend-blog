const express = require("express");
const router = express.Router();
const PaymentController = require('../controllers/payment');


router.post('/create-checkout-session', PaymentController.createSession);
router.post('/create-checkout-basico', PaymentController.createBasico);
router.post('/create-checkout-estandar', PaymentController.createStandar);
router.post('/create-checkout-premium', PaymentController.createPremium);
router.get('/success', PaymentController.captureOrder);
router.get('/cancel', PaymentController.cancelOrder );


module.exports = router

