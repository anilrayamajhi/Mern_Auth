const
  express = require('express')
  usersRouter = express.Router(),
  passportService = require('../services/passport'),
  passport = require('passport'),
  Authentication = require('../controllers/authentication'),
  //authenticated request using JWT; requrieAuth middleware
  requireAuth = passport.authenticate('jwt', { session: false }),
  requireSignin = passport.authenticate('local', {session: false});

usersRouter.get('/', requireAuth, function(req, res){
  res.send({hi: "pappi"})
})
usersRouter.post('/signin', requireSignin, Authentication.signin);
usersRouter.post('/signup', Authentication.signup);


module.exports = usersRouter
