require("dotenv").config();
const mongoose = require('mongoose');
 
//database connection
mongoose.connect(process.env.MONGO_URL);
 
const db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
 
db.once('open', function () {
    console.log("Connection Successful!");
});

module.exports = {db};