require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWTStrategy = require("passport-jwt").Strategy;
var LocalStrategy = require('passport-local');
var passport = require('passport');
const bcrypt= require('bcryptjs');
var { User } = require('../model/user_model');
const asyncHandler = require('express-async-handler')
 
//passport local strategy configuration
passport.use(new LocalStrategy(async function verify(username, password, cb) {
    const query = User.where({ username: username });
    await query.findOne().then(function (user) {
        if (!user) {
            return cb(null, false, { status: 401, message: 'User Does Not Exist' });
        }
        const isMatch = bcrypt.compare(password, user.password)
        if (isMatch) {
            cb(null, user, { status: 200, message: 'Login Successful.' });
        }
        else {
            cb(null, false, { status: 401, 
                message: 'Incorrect username or password.'
            })
        }
    }).catch(function (err) {
        console.log(err);
        cb(null, false, { status: 401, message: 'Error finding user' })
    });
}));
 
//passport jwt strategy configuration
passport.use(new JWTStrategy(
    {
        jwtFromRequest: (req) => req.headers['x-access-token'],
        secretOrKey: process.env.JWT_KEY,
    },
    (payload, done) => {
        return done(null, payload);
    }
));
 
passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username });
    });
});
 
passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

const RegsiterFunction = async (req, res) => {
    try {
      var user1 = new User(req.body);
      await user1.save().then(function (user) {
        if (user) {
          console.log(user.name + " saved to user collection.");
          res.json({ status: 200, message: user.name });
        }
      });
    } catch (err) {
      if (err && err.keyPattern) {
        //errors for various primary keys
        if (Object.keys(err.keyPattern)[0] == 'mobile') {
          res.json({ status: 500, message: "User with mobile already exists" });
        } else if (Object.keys(err.keyPattern)[0] == 'username') {
          res.json({ status: 500, message: "User with username already exists" });
        } else if (Object.keys(err.keyPattern)[0] == 'email') {
          res.json({ status: 500, message: "User with email already exists" });
        } else {
          res.json({ status: 500, message: "Internal Server Error1" });
        }
      } else {
        res.json({ status: 500, message: "Internal Server Error" });
      }
    }
  };

const LoginFunction= async (req,res)=>{
   passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
          return res.json({ status: 401, message: info.message });
      }
      req.login(user, { session: false }, (err) => {
          if (err) {
              res.json(err);
          }
          var userobject = {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                mobile: user.mobile,
                admin: user.admin
          }
          var token = jwt.sign(userobject, process.env.JWT_KEY);
          req.session.jwt = token;
          return res.json({ status: 200, token: token });
      });
  })(req, res);
};

const logoutfunction= async (req,res)=>{
   req.session.destroy(function (err) {
      if (err) { return next(err); }
      res.redirect('/');
  });
};

const sessionFunction= async (req,res)=>{
   passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err || !user) {
          res.json(false);
      } else {
          res.json(user);
      }
  })(req, res);
};

const getData= asyncHandler(async (req,res)=>{
   passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            res.json(false);
        } else {
            const {_id, name, username, email, mobile}= user;
            res.status(200).json({ _id, name, username, email, mobile });
        }
    })(req, res);
})

module.exports= {
   RegsiterFunction,
   LoginFunction,
   logoutfunction,
   sessionFunction,
   getData
};