require("dotenv").config();
const jwt= require('jsonwebtoken');
const Admin= require("../model/admin_model");

const auth = async (req, res, next) =>{
   try {
      const token= req.cookies.registeruser || req.headers["authorization"];
      const verifyuser= jwt.verify(token, process.env.JWT_KEY);
      const user= await Admin.findOne({_id:verifyuser._id});
      
      req.token= token;
      req.user= user;

      next();
   } catch (error) {
      res.status(404).json("You are not authenticated" +error );
   }
};





module.exports= auth;