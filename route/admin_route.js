const {adminRegister, adminLogin, adminlogout, admingetdata}= require('../controller/adminController');
const auth= require('../middleware/auth');
const express = require('express');
var router = express.Router();

router.post('/register', adminRegister);
router.post('/login',auth, adminLogin);
router.get('/logout',auth,adminlogout);
router.get('/getdata',auth, admingetdata)

module.exports= router;