var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var PetSchema = require('./pet');

var User = new mongoose.Schema({
  local: {
  email: String,
  password: String,
},
  name: { type: String, required: true },
  picture: String,
  location: String,
  age: Number,
  gender: String,
  pets: [PetSchema]
  }, { timestamp: true });
// todos : [Todo.schema]


User.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

User.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);
