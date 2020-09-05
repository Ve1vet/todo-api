let express = require( 'express' );
let bodyParser = require( 'body-parser' );

let { mongoose } = require( './db/mongoose' );
let { ToDoModel } = require( './models/todo' );
let { UserModel } = require( './models/user' );

let app = express();

app.use( bodyParser.json() );

app.get( '/todos', ( req, res ) => {

  ToDoModel.find().then( todos => {

    res.send( {todos} );
  }, e => {
    res.status( 400 ).send( e );
  } );
} );

app.listen( 3000, () => {
  console.log( `Started on port 3000` );
} );

app.post( '/todos', ( req, res ) => {

  let todo = new ToDoModel( {
    text: req.body.text
  } );

  todo.save().then( doc => {
    res.send( doc );
  } ).catch( e => {
    res.status( 400 ).send( e );
    //console.log( `Error => ${e}` );
  } );
} );

// let newToDo = new ToDoModel( {
  
//   text: '  Fully learn MongoDB  ',
// } );

// //newToDo.save().then( doc => console.log( 'Saved ToDo ', doc ), e => console.log( 'Unable to save ToDo.' ) );

// let otherToDo = new ToDoModel({
  
//   text: 'Feed the cat',
//   completed: true,
//   completedAt: Date.now()
// });

// //otherToDo.save().then( doc => console.log(JSON.stringify(doc, undefined, 2)), e => console.log('Unable to save', e) );

// let user = new UserModel({
//   email: 'velvet@example.com'
// });

// user.save().then(
//   doc => console.log( 'User saved ', doc )
// ).catch(
//   e => console.log( 'Unable to save user', e )
// );

module.exports = {
  app: app
};