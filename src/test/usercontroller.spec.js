import chai from 'chai';
import chaiHttp from 'chai-http';
import map from 'lodash/map';
import {models} from '../models';

chai.use(chaiHttp)
chai.should()

const URL = 'http://localhost:3000'


async function truncate(){
  await models.User.destroy({where: {}})
}
beforeEach(async () => {
  await truncate()
})

describe( 'Fetch all users', () => {
    it( 'It should GET all admins', done => {
      chai.request( URL )
        .get( '/api/v1/admins' )
        .end( ( error, response ) => {
          response.should.have.status( 200 );
          response.body.should.have.property( 'admins' );
          response.body.admins.should.be.a( 'array' );
          response.body.admins.length.should.be.eql( 0 );
          done();
        } );
    } );
    it('It should create admin', done => {
        chai.request( URL)
        .post('/api/v1/admins')
        .send({
            "firstName": "raymond",
	        "lastName": "akornor",
	        "email": "raymond@ampersandllc.co",
	        "phoneNumber": "0268166996"
        })
        .end((error, response) => {
            response.should.have.status(200)
            response.body.should.have.property( 'admin' );
            done()
        })
    })
  } );