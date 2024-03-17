const mongoose= require('mongoose');

const ReturnRecordSchema = mongoose.Schema({
   username: String,
   bookid: { type: mongoose.ObjectId, unique: true, ref: 'Book' },
   duedate: { type: Date, ref: 'BorrowerRecord' },
   fine: Number
}, { timestamps: true })

const ReturnRecord = mongoose.model('ReturnRecord', ReturnRecordSchema, 'returnrecords');

module.exports= {ReturnRecord};