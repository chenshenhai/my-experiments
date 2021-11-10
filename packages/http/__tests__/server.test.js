const supertest = require('supertest')
const chai = require('chai')
const app = require('../src/server')

const expect = chai.expect
const request = supertest( app.listen() )

describe( 'Test HTTP Server', ( ) => {
  
  it('Get: /get-str', (done) => {
    request 
      .get('/get-str')
      .expect(200)
      .end(( err, res ) => {
        if (err) {
          return done(err);
        }
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.an('boolean');
        expect(res.body.data).to.be.an('string');
        done();
      });
  })
})