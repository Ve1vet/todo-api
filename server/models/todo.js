let mongoose = require('mongoose');

let ToDoModel = mongoose.model( 'Todo', {
  
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


module.exports = {
  ToDoModel: ToDoModel
};