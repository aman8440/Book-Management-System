const mongoose= require('mongoose');
const validator= require('validator');
const bcrypt= require('bcryptjs');

var UserSchema = new mongoose.Schema({
   name: { type: String, required:true},
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
   mobile: {
      type: Number,
      minlength:10,
      maxlength:10,
      required:true,
   },
   admin: { type: Boolean, default: false },
   createdAt: {
      type: Date,
      default: Date.now,
    }
});

UserSchema.pre("save", async function (next) {
   if(this.isModified("password")){
      this.password= await bcrypt.hash(this.password, 10);
   }
   next();
});

const User= new mongoose.model("User", UserSchema);

module.exports = {User};

