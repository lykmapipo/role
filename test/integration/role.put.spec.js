'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Role } = require(path.join(__dirname, '..', '..'));

describe('Role Put', function () {

  before((done) => {
    Role.deleteMany(done);
  });

  describe('static put', function () {

    let role = Role.fake();

    before((done) => {
      role.post((error, created) => {
        role = created;
        done(error, created);
      });
    });

    it('should be able to put', (done) => {
      role = role.fakeOnly('description');
      Role.put(role._id, role, (error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(role._id);
        expect(updated.name).to.eql(role.name);
        done(error, updated);
      });
    });

    it('should throw if not exists', (done) => {
      const fake = Role.fake();
      Role.put(fake._id, fake, (error, updated) => {
        expect(error).to.exist;
        expect(error.status).to.exist;
        expect(error.message).to.be.equal('Not Found');
        expect(updated).to.not.exist;
        done();
      });
    });

  });

  describe('instance put', function () {

    let role = Role.fake();

    before((done) => {
      role.post((error, created) => {
        role = created;
        done(error, created);
      });
    });

    it('should be able to put', (done) => {
      role = role.fakeOnly('description');
      role.put((error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(role._id);
        expect(updated.name).to.eql(role.name);
        done(error, updated);
      });
    });

    it('should throw if not exists', (done) => {
      role.put((error, updated) => {
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
