const express = require("express");
const router = express.Router();
const {addProduct,getAllProducts,getOneProduct} =  require('../controllers/products');


router.route('/all-products').get(getAllProducts);
router.route('/product/:productid').get(getOneProduct);
router.route('/add-product').post(addProduct);

module.exports = router;