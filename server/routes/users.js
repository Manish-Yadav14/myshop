const express = require("express");
const router = express.Router();
const {login,signup, getUserInfo} =  require('../controllers/users');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/userInfo').post(getUserInfo);


module.exports = router;