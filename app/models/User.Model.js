var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
password: {
    type: String,
    minlength:[6,'Minimum password length is 6 characters']

  },
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.comparePassword = function(password) {
  // return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', UserSchema);