const {adminRegister, adminLogin}= require('../controller/adminController');
const auth= require('../middleware/auth');
const express = require('express');
var router = express.Router();

router.post('/register', adminRegister);
router.post('/login',auth, adminLogin);

module.exports= router;