const express = require("express");
const router = express.Router();
const {addProduct,getAllProducts,getOneProduct, deleteProduct} =  require('../controllers/products');


router.route('/all-products').get(getAllProducts);
// router.route('/product/:productid').get(getOneProduct);
router.route('/product').post(getOneProduct);
router.route('/add-product').post(addProduct);
router.route('/delete-product').post(deleteProduct);


module.exports = router;