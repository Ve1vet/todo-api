let mongoose = require('mongoose');

module.exports = mongoose.model( 'ToDo', {
  
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Number,
    default: Date.now()
  }
} );