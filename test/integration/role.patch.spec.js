'use strict';


/* dependencies */
const _ = require('lodash');
const { expect } = require('@lykmapipo/mongoose-test-helpers');
const { Role } = require('../..');

describe('Role Patch', () => {

  before((done) => {
    Role.deleteMany(done);
  });

  describe('static patch', () => {

    let role = Role.fake();

    before((done) => {
      role.post((error, created) => {
        role = created;
        done(error, created);
      });
    });

    it('should be able to patch', (done) => {
      role = role.fakeOnly('description');
      Role.patch(role._id, role, (error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(role._id);
        expect(updated.name).to.eql(role.name);
        done(error, updated);
      });
    });

    it('should throw if not exists', (done) => {
      const fake = Role.fake().toObject();
      Role.patch(fake._id, _.omit(fake, '_id'), (error, updated) => {
        expect(error).to.exist;
        // expect(error.status).to.exist;
        expect(error.name).to.be.equal('DocumentNotFoundError');
        expect(updated).to.not.exist;
        done();
      });
    });

  });

  describe('instance patch', () => {

    let role = Role.fake();

    before((done) => {
      role.post((error, created) => {
        role = created;
        done(error, created);
      });
    });

    it('should be able to patch', (done) => {
      role = role.fakeOnly('description');
      role.patch((error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(role._id);
        expect(updated.name).to.eql(role.name);
        done(error, updated);
      });
    });

    it('should throw if not exists', (done) => {
      role.patch((error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(role._id);
        done();
      });
    });

  });

  after((done) => {
    Role.deleteMany(done);
  });

});
