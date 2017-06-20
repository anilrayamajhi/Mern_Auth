console.log("App started");
//Dependencies
var
  express = require('express'),
  //instance of express
  app = express(),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  // hash = require('bcrypt-nodejs'),
  // path = require('path'),
  // passport = require('passport'),
  // passportConfig = require('./config/passport.js'),
  MongoStore = require('connect-mongo')(expressSession),
  // user schema/model
  User = require('./models/User.js'),

  // require routes
  usersRoutes = require('./routes/users.js'),

  //mongo variable
  mongoConnection = process.env.MONGO_URL,

//Port declaration
  PORT = process.env.PORT || 7000


mongoose.connect(mongoConnection, function(err) {
  console.log(err || "Connected to MongoDB (mern-auth)")
})

// define middleware
app.use(express.static(path.join(__dirname, '../client')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())
// app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/user/', usersRoutes)
// app.use('/api/', pagesRoutes)

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, '../client', 'index.html'))
// })

app.use(function(req, res, next){
  if(req.user) req.app.currentUser = req.user
  req.app.loggedIn = !!req.user
  next()
})

// error hndlers
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res) {
  res.status(err.status || 500)
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }))
})


app.listen(PORT, function(err) {
  console.log(err || "Server running on port " + PORT)
})
