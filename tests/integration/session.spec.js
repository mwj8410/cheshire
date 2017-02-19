const expect = require('expect');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('controller: session', () => {

  describe('route: GET /', () => {

    it('returns a session object', done => {
      chai.request(global.server)
      .get('/api/session')
      .end((err, res) => {
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
        done();
      });
    });

  });

});
