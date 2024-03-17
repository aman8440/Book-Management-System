const Admin = require('../model/admin_model');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken'); 
const cookieParser= require('cookie-parser');

const adminRegister= async (req,res)=>{
   try {
      const { username, email, password } = req.body;
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({ username, email, password: hashedPassword });
      const token = await newAdmin.generateAuthToken();
      res.cookie("registeruser", token, {
         expires: new Date(Date.now() + (300*3000)),
         httpOnly:true
      });
      await newAdmin.save();
      res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' +error});
    }
};

const adminLogin= async (req,res)=>{
   
   try {
      const { email, password } = req.body;
      const useremail= await Admin.findOne({email:email});
      const isMatch= await bcrypt.compare(password, useremail.password);
      const token = await useremail.generateAuthToken();
      console.log('the token part ' + token);
      res.cookie("registeruser", token, { 
        expires: new Date(Date.now() + (13*24*3600000)),
        httpOnly:true
      });

      // console.log(cookie);

      if(isMatch){
        var responeObject = {
          "status": {
              "type": "success",
              "message": "you are successfully login",
              "code": 200,
              "error": false
          },
          "data": [
              {
                  "status": "Authenticated",
                  "user": {
                     "username": req.body.username,
                     "email": req.body.email,
                  }
              
              }
          ]
      };
        res.json(responeObject);
      }
      else{
        res.status(200);
        var responeObject = {
          "status": {
              "type": "Failed",
              "message": "Invalid login details",
              "code": 200,
              "error": true
          },
          "data": [
              {
                  "status": "Authenticated",
                  "user": {
                     "username": req.body.username,
                     "email": req.body.email,
                  }
              
              }
          ]
      };
        res.json(responeObject);
      }

   } catch (error) {
        res.status(404);
        var responeObject = {
          "status": {
              "type": "Failed",
              "message": "Invalid login details",
              "code": 404,
              "error": true
          },
          "data": [
              {
                  "status": "Authenticated",
                  "user": {
                      "email": req.body.email,
                  }
              
              }
          ]
      };
        res.json(responeObject);
   }
}

module.exports= {
   adminRegister,
   adminLogin
};