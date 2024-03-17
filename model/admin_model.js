const mongoose = require("mongoose");
const jwt= require('jsonwebtoken');
const validator= require('validator');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
   username: { type: String, unique: true },
   email: {
      type: String,
      required: true,
      validate(value){
         if(!validator.isEmail(value)){
            throw new Error("Invalid Email")
         }
      }
   },
   password:{
      type:String,
      required:true,
      minlength:[8, "Minimum at least 8 characters are allowed"]
   },
  tokens: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

adminSchema.methods.generateAuthToken= async function(){
   try {
      const token= jwt.sign({_id:this._id.toString()}, process.env.JWT_KEY);
      // this.tokens= this.tokens.concat({token:token})
      this.tokens = [token];
      await this.save();
      return token;
   } catch (error) {
      throw error;
      console.log("the error part" + error);
   }
}

module.exports = mongoose.model("Admin", adminSchema);
