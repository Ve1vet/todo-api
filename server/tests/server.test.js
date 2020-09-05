const expect = require( 'expect' );
const request = require( 'supertest' );

const { app } = require( './../server' );
const { ToDoModel } = require( './../models/todo' );

beforeEach( done => {

  ToDoModel.remove({}).then( () => done() );
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

      ToDoModel.find( {text} ).then( todos => {

        expect( todos.length ).toBe( 1 );
        expect( todos[0].text ).toBe( text );
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

        expect( todos.length ).toBe( 0 );
        done();
      } ).catch( e => done(e) );
    } );
  } );

} );