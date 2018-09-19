'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Role } = require(path.join(__dirname, '..', '..'));

describe('Role Delete', () => {

  before((done) => {
    Role.deleteMany(done);
  });

  describe('static delete', () => {
    let role;

    before((done) => {
      role = Role.fake();
      role.post((error, created) => {
        role = created;
        done(error, created);
      });
    });

    it('should be able to delete', (done) => {
      Role.del(role._id, (error, deleted) => {
        expect(error).to.not.exist;
        expect(deleted).to.exist;
        expect(deleted._id).to.eql(role._id);
        done(error, deleted);
      });
    });

    it('should throw if not exists', (done) => {
      Role.del(role._id, (error, deleted) => {
        expect(error).to.exist;
        expect(error.status).to.exist;
        expect(error.message).to.be.equal('Not Found');
        expect(deleted).to.not.exist;
        done();
      });
    });

  });

  describe('instance delete', () => {
    let role;

    before((done) => {
      role = Role.fake();
      role.post((error, created) => {
        role = created;
        done(error, created);
      });
    });

    it('should be able to delete', (done) => {
      role.del((error, deleted) => {
        expect(error).to.not.exist;
        expect(deleted).to.exist;
        expect(deleted._id).to.eql(role._id);
        done(error, deleted);
      });
    });

    it('should throw if not exists', (done) => {
      role.del((error, deleted) => {
        expect(error).to.not.exist;
        expect(deleted).to.exist;
        expect(deleted._id).to.eql(role._id);
        done();
      });
    });

  });

  after((done) => {
    Role.deleteMany(done);
  });

});
