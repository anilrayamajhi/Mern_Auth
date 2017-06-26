// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
// var passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new Schema({
  email: {type: String, required: true, trim: true, unique: true, lowercase: true},
  // username: {type: String, required: true, trim: true},
  password: {type: String, required: true, trim: true},
  // pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Page'}],
})

//password encryption
userSchema.pre('save', function(next){
  const user = this; //get access to User model

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt){
    if(err){return next(err);}

    //hash password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) {return next(err);}

      // overwrite plain password with encrypted password
      user.password = hash;
      next();
    })
  })
})


userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err){return callback(err);}
    callback(null, isMatch)
  })
}

//export model    //model class
module.exports = mongoose.model('User', userSchema)
