const chai = require('chai')
const expect = chai.expect;

describe('test: index', ( ) => {
  
  it('demo', (done) => {
    expect('1').to.be.an('string')
    done();
  })
})