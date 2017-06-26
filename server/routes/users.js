var
  express = require('express')
  usersRouter = express.Router(),
  Authentication = require('../controllers/authentication');
//   usersCtrl = require('../controllers/users.js')
//
// usersRouter.post('/register', usersCtrl.register)
//
//
// usersRouter.post('/login', usersCtrl.login)
//
// usersRouter.get('/logout', usersCtrl.logout)

usersRouter.post('/signup', Authentication.signup);


module.exports = usersRouter
