const mongoose= require('mongoose');

var BookSchema = mongoose.Schema({
   name: { type: String, required:true},
   author: { type: String, required:true},
   genre: { type: String, required:true},
   type: { type: String, required:true},
   available: { type: Boolean, default: true }
}, { timestamps: true })

const Book= new mongoose.model('Book', BookSchema, 'books');

module.exports = {Book};

