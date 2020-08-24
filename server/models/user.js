let mongoose = require('mongoose');

module.exports = mongoose.model( 'User', {

  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
} );