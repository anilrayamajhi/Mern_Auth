const User = require('../models/User');
const jwt = require('jwt-simple');

function tokenForUser(user){
  const timestamp = new Date().getTime();
  // console.log(jwt.encode({ sub: user.id, iat:timestamp }, process.env.secret));
  // iat: issued at timestamp
  return jwt.encode({ sub: user.id, iat:timestamp }, process.env.secret);
}

exports.signin = function(req, res, next){
  //User has already had their email and password authenticated
  //We just need to give them a token
  res.send({token: tokenForUser(req.user)})
}

exports.signup = function(req, res, next){
  // console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  if(!email){
    return res.status(422).send({error: 'Email is required'})
  }else if(!password){
    return res.status(422).send({error: 'Password is required'})
  }

  User.findOne({email: email}, function(err, existingUser){
    if(err){return next(err);}

    if(existingUser){
      return res.status(422).send({error: 'Email already exist'});
    }
    // 422: unprocessable entity

    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err){
      if(err){return next(err);}
      res.json({token: tokenForUser(user)});
    });
  })
}
