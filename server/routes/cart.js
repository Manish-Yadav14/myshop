const express = require("express");
const router = express.Router();
const {addProductToCart,removeProductFromCart, getCart} =  require('../controllers/cart');

router.route('/add-to-cart').post(addProductToCart);
router.route('/remove-from-cart').post(removeProductFromCart);
router.route('/get-cart').post(getCart);

module.exports = router