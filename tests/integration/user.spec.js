const expect = require('expect');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('rout:user:get', () => {
  it('ran a test', done => {
    chai.request(global.server)
    .get('/api/user')
    .end((err, res) => {
      expect(res.status).toBe(200);
      done();
    });
  });
});
