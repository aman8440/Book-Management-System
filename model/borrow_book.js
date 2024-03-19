const mongoose= require('mongoose');

const BorrowerRecordSchema = mongoose.Schema({
   username: String,
   bookid: { type: mongoose.ObjectId, unique: true, ref: 'Book' },
   duedate: {
       type: Date,
       default: () => new Date(+new Date() + 15 * 24 * 60 * 60 * 1000),
       required: 'Must Have DueDate'
   },
   adminid: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true })

const BorrowerRecord = mongoose.model('BorrowerRecord', BorrowerRecordSchema, 'borrowers');

module.exports = {BorrowerRecord};