const { MongoClient, ObjectID } = require('mongodb');

let obj = ObjectID();
console.log( obj );

MongoClient.connect( 'mongodb://localhost:27017/TodoApp', ( error, client ) => {

  if( error ){
    console.log( 'Unable to connect to MongoDB server.' );
    console.log( error );
    return;
  }
  console.log( '\n' );
  console.log( 'Connected to MongoDB server.' );
  const db = client.db('TodoApp');

  // db.collection('Todos').find( {completed: false} ).toArray().then( docs => {

  //   console.log( 'Todos' );
  //   console.log( JSON.stringify( docs, undefined, 2 ) );
  // } ).catch( error => {
  //   console.log( 'Unable to fetch todos', error );
  // } );

  // db.collection('Todos').find( {_id: new ObjectID('5ef7dcef7ca3251e58d5a271')} ).toArray().then( docs => {

  //   console.log( 'Todos' );
  //   console.log( JSON.stringify( docs, undefined, 2 ) );
  // } ).catch( error => {
  //   console.log( 'Unable to fetch todos', error );
  // } );

  db.collection('Todos').find( {} ).count().then( count => {

    console.log( 'Todos count:', count );
  } ).catch( error => {
    console.log( 'Unable to fetch todos', error );
  } );

  db.collection('Users').find( {name: "Velvet"} ).toArray().then( result => {

    console.log( 'Users' );
    console.log( JSON.stringify( result, undefined, 2 ) );
  } ).catch( error => console.log( `Unable to fetch Users: `, error ) );

  client.close();

} );