const {RegsiterFunction, LoginFunction, logoutfunction, sessionFunction, getData}= require('../controller/userController');

const express = require('express');
var router = express.Router();

router.post('/register', RegsiterFunction);
router.post('/login', LoginFunction);
router.post('/logout', logoutfunction);
router.get('/session', sessionFunction);
router.get('/getdetails', getData);

module.exports= router;
