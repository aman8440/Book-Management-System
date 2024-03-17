require('dotenv').config();
require('mongodb');
const bodyParser = require('body-parser');
const express= require('express');
var session = require('express-session');
const MongoStore = require("connect-mongo");
const cors= require('cors');
const http= require('http');
const cookieParser = require("cookie-parser");
const port = process.env.PORT || "5000";
const app = express();
var { db } = require('./db/connection');
var authRouter = require('./route/user_route');
var libraryRouter = require('./route/book_route');
var adminRouter= require('./route/admin_route');
//body-parser configuration 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
 
//session configuration
app.use(session({
    secret: process.env.secret1,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        client: db.getClient(),
        dbName: 'task',
        collectionName: "sessions",
        stringify: false,
        autoRemove: "interval",
        autoRemoveInterval: 1
    })
}));
 
app.use('/', authRouter);
app.use('/', libraryRouter);
app.use('/admin', adminRouter);
 
//server listening
app.listen(port, () => {
    console.log(`server started on ${port}`);
});
