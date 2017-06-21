// user model
var mongoose = require('mongoose')
var Schema = mongoose.Schema
// var passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new Schema({
  email: {type: String, required: true, trim: true, unique: true, lowercase: true},
  // username: {type: String, required: true, trim: true},
  password: {type: String, required: true, trim: true},
  // pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Page'}],
})

//password encryption
// userSchema.plugin(passportLocalMongoose)

//export model    //model class
module.exports = mongoose.model('User', userSchema)
