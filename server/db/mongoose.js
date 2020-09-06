let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect( 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true, useUnifiedTopology: true } );
mongoose.connect( 'mongodb+srv://root:root@mongodblearn.gkrpa.mongodb.net/TodoApp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true } );

module.exports = {
  mongoose: mongoose
};