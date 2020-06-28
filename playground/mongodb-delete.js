const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect( 'mongodb://localhost:27017/TodoApp', ( error, client ) => {

  if( error ){
    console.log( 'Unable to connect to MongoDB server.' );
    console.log( error );
    return;
  }
  console.log( '\n' );
  console.log( 'Connected to MongoDB server.' );
  const db = client.db('TodoApp');

  // db.collection( 'Todos' ).deleteMany( {text: "Eat lunch"} ).then( result => {
  //   console.log( result );
  // } );

  // db.collection( 'Todos' ).deleteOne( {text: "Walk the dog"} ).then( result => console.log( result ) );

  //findOneAndDelete
  db.collection('Todos').findOneAndDelete( {text: "Something to do"} ).then( result => console.log(result) );

  client.close();

} );