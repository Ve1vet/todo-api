// const mongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// let obj = ObjectID();
// console.log( obj );

/* MongoClient.connect( 'mongodb://localhost:27017/TodoApp', ( error, client ) => {

  if( error ){
    console.log( 'Unable to connect to MongoDB server.' );
    console.log( error );
    return;
  }
  console.log( '\n' );
  console.log( 'Connected to MongoDB server.' );
  
  // const db = client.db('TodoApp');

  // Insert new doc into Todos(text,completed)
  // db.collection('Todos').insertOne( {
  //   text: 'Something to do',
  //   completed: false,
  // }, ( error, result ) => {
    
  //   if( error ){
  //     return console.log( 'Unable to insert todo', error );
  //   }
  //   console.log( JSON.stringify(result.ops, undefined, 2) );
  // } );

  // Insert new doc into Users(name, age, location)
  // db.collection('Users').insertOne( {
  //   name: 'Velvet',
  //   age: 34,
  //   location: 'Ukraine',
  // }, ( error, result ) => {
    
  //   if( error ){
  //     return console.log( 'Unable to insert users', error );
  //   }
  //   console.log( JSON.stringify( result.ops, undefined, 2 ) );
  //   console.log(result.ops[0]._id.getTimestamp());
  // } );

  // let user = { name: 'Velvet', age: 34 };
  // let {name} = user;
  // console.log( name );

  client.close();

} ); */


const uri = "mongodb+srv://root:root@mongodblearn.gkrpa.mongodb.net/MongoDBLearn?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("todoapp").collection("todos");
  // perform actions on the collection object
  client.close();
});
