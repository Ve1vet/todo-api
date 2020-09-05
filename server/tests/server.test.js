const expect = require( 'expect' );
const request = require( 'supertest' );

const { app } = require( './../server' );
const { ToDoModel } = require( './../models/todo' );

const todosPredefined = [
  { text: 'First test TODO' },
  { text: 'Second test TODO' },
];

beforeEach( done => {

  ToDoModel.deleteMany({}).then( () => {
    return ToDoModel.insertMany( todosPredefined );
  } ).then( () => done() );
} );

describe( 'POST /todos', () => {
  
  it( 'Should create a new ToDo', done => {
    
    let text = 'Test ToDo text';

    request( app )
    .post( '/todos' )
    .send( {text} ) // Same as {text: text} -> shorten in ES6
    .expect( 200 )
    .expect( res => {
      expect( res.body.text ).toBe( text );
    } )
    .end( (err, res) => {
      
      if( err ){
        return done( err );
      }

      ToDoModel.find().then( todos => {

        expect( todos.length ).toBe( 3 );
        expect( todos[2].text ).toBe( text );
        done();
      } ).catch( e => done( e ) );
    } );

  } );

  it( 'Should not create todo with invalid body data', done => {

    request( app )
    .post( '/todos' )
    .send( {} )
    .expect( 400 )
    .end( (err, res) => {

      if( err ){
        return done( err );
      }

      ToDoModel.find().then( todos => {

        expect( todos.length ).toBe( 2 );
        done();
      } ).catch( e => done(e) );
    } );
  } );

} );

describe( 'GET /todos', () => {

  it( 'Should get all todos', done => {

    request( app )
    .get( '/todos' )
    .expect( 200 )
    .expect( res => {
      
      expect( res.body.todos.length ).toBe( 2 );
    } )
    .end( done );
  } );
} );