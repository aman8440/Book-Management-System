const express = require('express');
var router = express.Router();

const {CreatebookFunction, borrow, returnFunction, fineFunction}= require('../controller/libraryController');
const {User}= require('../model/user_model');
const {Book}= require('../model/book_model');

router.get('/', (req, res) => {
   res.send("Welcome To Library Management System");
});

//route for getting all books from database
router.get('/getbooks', async (req, res) => {
   const books = await Book.find({});
   res.send({ status: 200, books: books });
});

//route for getting all users from database
router.get('/getusers', async (req, res) => {
   const users = await User.find({});
   res.send({ status: 200, users: users });
});

router.post('/createbook', CreatebookFunction);
router.post('/borrowbook', borrow);
router.post('/returnbook', returnFunction);
router.post('/payfine', fineFunction);

module.exports= router;