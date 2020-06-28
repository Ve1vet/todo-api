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

  db.collection( 'Todos' )
  .findOneAndUpdate( {text: "Drink water"}, {$set: {completed: true}}, {returnOriginal: false} )
  .then( result => console.log( result ) );

  client.close();

} );