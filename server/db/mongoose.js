let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let mongodb_env = process.env.MongoDB || 'mongodb+srv://test:test@mongodblearn.gkrpa.mongodb.net/TodoApp?retryWrites=true&w=majority';
// mongoose.connect( 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true, useUnifiedTopology: true } );
mongoose.connect( mongodb_env, { useNewUrlParser: true, useUnifiedTopology: true } );

module.exports = {
  mongoose: mongoose
};