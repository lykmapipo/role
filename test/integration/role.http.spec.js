'use strict';


/* dependencies */
const path = require('path');
const request = require('supertest');
const { expect } = require('chai');
const {
  Role,
  roleRouter,
  app
} = require(path.join(__dirname, '..', '..'));

describe('Role HTTP Spec', () => {

  before((done) => {
    Role.deleteMany(done);
  });

  let role = Role.fake();

  before((done) => {
    role.post((error, created) => {
      role = created;
      done(error, created);
    });
  });

  it('should handle HTTP GET on /roles', (done) => {
    request(app)
      .get(`/v${roleRouter.apiVersion}/roles`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        //assert payload
        const result = response.body;
        expect(result.data).to.exist;
        expect(result.total).to.exist;
        expect(result.limit).to.exist;
        expect(result.skip).to.exist;
        expect(result.page).to.exist;
        expect(result.pages).to.exist;
        expect(result.lastModified).to.exist;

        done(error, response);
      });
  });

  it('should handle HTTP GET on /roles/id:', (done) => {
    request(app)
      .get(
        `/v${roleRouter.apiVersion}/roles/${role._id}`
      )
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const found = response.body;
        expect(found._id).to.exist;
        expect(found._id).to.be.eql(role._id.toString());
        expect(found.name).to.be.eql(role.name);

        done(error, response);
      });
  });

  it('should handle HTTP PATCH on /roles/id:', (done) => {
    const patch = role.fakeOnly('description');
    request(app)
      .patch(
        `/v${roleRouter.apiVersion}/roles/${role._id}`
      )
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(patch)
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const updated = response.body;

        expect(updated._id).to.exist;
        expect(updated._id).to.be.eql(role._id.toString());
        expect(updated.name).to.be.eql(role.name);

        done(error, response);
      });
  });

  it('should handle HTTP PUT on /roles/id:', (done) => {
    const put = role.fakeOnly('description');
    request(app)
      .put(
        `/v${roleRouter.apiVersion}/roles/${role._id}`
      )
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(put)
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const updated = response.body;

        expect(updated._id).to.exist;
        expect(updated._id).to.be.eql(role._id.toString());
        expect(updated.name).to.be.eql(role.name);
        done(error, response);

      });

  });

  after((done) => {
    Role.deleteMany(done);
  });

});
