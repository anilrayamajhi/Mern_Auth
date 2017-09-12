const
  passport = require('passport'),
  User = require('../models/User'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  LocalStrategy = require('passport-local');

//Create local Strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
  //Verify this email and password,
  // call done with the user if correct email and password
  // else call done with false
  User.findOne({ email: email }, function(err, user){
    if(err) { return done(err); }
    if(!user) { return done(null, false); }

    //compare passwords
    user.comparePassword(password, function(err, isMatch) {
      if(err){return done(err);}
      if(!isMatch){return done(null, false);}

      return done(null, user);
    })
  })

})

//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.secret
};

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  // See if user ID in the payload exists in our database
  // If yes, call 'done' with that user object
  // else, call 'done' without a user object
  User.findById(payload.sub, function(err, user){
    if(err) {return done(err, false);}
    if(user){
      done(null, user);
    }else{
      done(null, false);
    }
  })
});

//Tell passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);
