let express = require( 'express' );
let bodyParser = require( 'body-parser' );

const { ObjectID } = require( 'mongodb' );
let { mongoose } = require( './db/mongoose' );
let { ToDoModel } = require( './models/todo' );
let { UserModel } = require( './models/user' );

let app = express();
const port = process.env.PORT || 3000;

app.use( bodyParser.json() );

app.get( '/todos', ( req, res ) => {

  ToDoModel.find().then( todos => {

    res.send( {todos} );
  }, e => {
    res.status( 400 ).send( e );
  } );
} );

app.get( '/todos/:id', ( req, res ) => {
  
  let id = req.params.id;

  if( !ObjectID.isValid( id ) ){
    return res.status( 404 ).send();
  }

  ToDoModel.findById( id ).then( todo => {

    if( !todo ){
      return res.status( 404 ).send();
    }

    res.status( 200 ).send( {todo} );

  } ).catch( e => res.status( 400 ).send() );
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

app.delete( '/todos/:id', ( req, res ) => {

  let id = req.params.id;

  if( !ObjectID.isValid( id ) ){
    return res.status( 404 ).send();
  }

  ToDoModel.findByIdAndDelete( id ).then( todo => {

    if( !todo ){
      return res.status( 404 ).send();
    }

    res.send( {todo} );
  } ).catch( e => res.status( 400 ).send() );
} );

app.patch( '/todos/:id', ( req, res ) => {

  let id = req.params.id;
  let body = _.pick( req.body, ['text', 'completed'] );

  if( !ObjectID.isValid( id ) ){
    return res.status( 404 ).send();
  }

  if( _.isBoolean( body.completed )  && body.completed ){
    body.completedAt = new Date().getTime();
  }
  else{

    body.completed = false;
    body.completedAt = null;
  }

  ToDoModel.findByIdAndUpdate( id, {$set: body}, {new: true} ).then( todo => {

    if( !todo ){
      return res.status( 404 ).send();
    }

    res.send( {todo} );
  } ).catch( e => res.status( 400 ).send() );
} );

app.listen( port, () => {
  console.log( `Started on port ${port}` );
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