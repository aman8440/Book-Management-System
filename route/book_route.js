const express = require('express');
var router = express.Router();

const {CreatebookFunction, borrow, returnFunction, fineFunction}= require('../controller/libraryController');
const auth= require('../middleware/auth');
const {User}= require('../model/user_model');
const {Book}= require('../model/book_model');



//route for getting all books from database
router.get('/getbooks',auth, async (req, res) => {
   const books = await Book.find({});
   res.send({ status: 200, books: books });
});

//route for getting all users from database
router.get('/getusers', async (req, res) => {
   const users = await User.find({});
   res.send({ status: 200, users: users });
});

router.post('/createbook',auth, CreatebookFunction);
router.post('/borrowbook',auth, borrow);
router.post('/returnbook', auth, returnFunction);
router.post('/payfine',auth, fineFunction);

module.exports= router;