const expect = require('expect');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('main: server and support systems', () => {

  it('starts and responds to requests', done => {
    chai.request(global.server)
    .get('/api/user') // ned a test rout to check
    .end((err, res) => {
      expect(res.status).toBe(200);
      done();
    });
  });

});
