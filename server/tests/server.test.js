const expect = require( 'expect' );
const request = require( 'supertest' );

const { ObjectID } = require( 'mongodb' );
const { app } = require( './../server' );
const { ToDoModel } = require( './../models/todo' );

const todosPredefined = [
  {
    _id:  new ObjectID(),
    text: 'First test TODO',
  },
  {
    _id:  new ObjectID(),
    text: 'Second test TODO'
  },
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

describe( 'GET /todos/:id', () => {

  it( 'Should return todo document', done => {

    request( app )
    .get( `/todos/${todosPredefined[0]._id.toHexString()}` )
    .expect( res => {
      expect( res.body.todo.text ).toBe( todosPredefined[0].text );
    } )
    .end( done );

  } );

  it( 'Should return 404 if todo not found', done => {

    let hexID = new ObjectID().toHexString();

    request( app )
    .get( `/todos/${hexID}` )
    .expect( 404 )
    .end( done );
  } );

  it( 'Should return 404 for non-object ids', done => {
    
    request( app )
    .get( '/todos/123abc' )
    .expect( 404 )
    .end( done );
  } );
} );

describe( 'DELETE /todos/:id', () => {
  
  it('should remove a todo', (done) => {
    
    let hexId = todos[1]._id.toHexString();

    request( app )
    .delete( `/todos/${hexId}` )
    .expect( 200 )
    .expect( res => expect( res.body.todo._id ).toBe( hexId ) )
    .end( (err, res) => {
      
      if( err ){
        return done( err );
      }
      
      ToDoModel.findById( hexId ).then( todo => {
        
        expect( todo ).toBeFalsy();
        done();
      } ).catch( e => done( e ) );
    } );
  } );

  it( 'should return 404 if todo not found', done => {
    
    let hexId = new ObjectID().toHexString();

    request( app )
    .delete( `/todos/${hexId}` )
    .expect( 404 )
    .end( done );
  } );

  it( 'should return 404 if object id is invalid', done => {
    
    request( app )
    .delete( '/todos/123abc' )
    .expect( 404 )
    .end( done );
  } );
} );

describe( 'PATCH /todos/:id', () => {
  
  it( 'should update the todo', done => {
    
    let hexId = todos[0]._id.toHexString();
    let text = 'This should be the new text';

    request( app )
    .patch( `/todos/${hexId}` )
    .send( {
      completed: true,
      text
    } )
    .expect( 200 )
    .expect( res => {
      
      expect( res.body.todo.text ).toBe( text );
      expect( res.body.todo.completed ).toBe( true );
      expect( res.body.todo.completedAt ).toBeA( 'number' );
    })
    .end( done );
  } );
  
  it( 'should clear completedAt when todo is not completed', done => {
    
    let hexId = todos[1]._id.toHexString();
    let text = 'This should be the new text!!';

    request( app )
    .patch( `/todos/${hexId}` )
    .send( {
      completed: false,
      text
    } )
    .expect( 200 )
    .expect( res => {
      
      expect( res.body.todo.text ).toBe( text );
      expect( res.body.todo.completed ).toBe( false );
      expect( res.body.todo.completedAt ).toNotExist();
    } )
    .end( done );
  } );
} );