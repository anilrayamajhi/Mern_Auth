var
  express = require('express')
  usersRouter = express.Router(),
//   usersCtrl = require('../controllers/users.js')
//
// usersRouter.post('/register', usersCtrl.register)
//
//
// usersRouter.post('/login', usersCtrl.login)
//
// usersRouter.get('/logout', usersCtrl.logout)

usersRouter.get('/', function(req, res, next){
  res.send(['waterbottle', 'phone', 'oneplus one']);
});


module.exports = usersRouter
