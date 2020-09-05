let mongoose = require('mongoose');

let user = mongoose.model( 'User', {

  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
} );

module.exports = {
  UserModel: user
};