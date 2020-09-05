const { ObjectID } = require( 'mongodb' );

const { mongoose } = require( './../server/db/mongoose' );

const { ToDoModel } = require( './../server/models/todo' );
const { UserModel } = require( './../server/models/user' );

let id = '5f533a5e5816bc1fd484ff56';
//let id = '5f533a5e5816bc1fd484ff561'; // Not valid Id

/* if( !ObjectID.isValid( id ) ){
  
  console.log( 'ID not valid.' )
  return;
}

ToDoModel.find( {_id: id} ).then( todo => console.log( `Todo => `, todo ) );

ToDoModel.findOne( {_id: id} ).then( todo => console.log( `Todo => `, todo ) );

ToDoModel.findById( id ).then( todo => { 
  
  if( !todo ){
    return console.log( 'ID not found' );
  }

  console.log( `Todo => `, todo );
} ).catch( e => console.log( e ) ); */

let userID = '5f40382856bdb807dcbec80a';

UserModel.findById( userID ).then( user => {

  if( !user ){
    return console.log( 'Unable to find the user.' );
  }

  console.log( JSON.stringify( user, undefined, 2 ) );
}, err => console.log( err ) );