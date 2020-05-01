'use strict';


/* dependencies */
const { expect } = require('@lykmapipo/mongoose-test-helpers');
const { Role } = require('../..');

describe('Role Post', () => {

  before((done) => {
    Role.deleteMany(done);
  });

  describe('static post', () => {

    let role = Role.fake();

    it('should be able to post', (done) => {
      Role.post(role, (error, created) => {
        expect(error).to.not.exist;
        expect(created).to.exist;
        expect(created._id).to.eql(role._id);
        expect(created.name).to.exist;
        done(error, created);
      });
    });

  });

  describe('instance post', () => {

    let role = Role.fake();

    it('should be able to post', (done) => {
      role.post((error, created) => {
        expect(error).to.not.exist;
        expect(created).to.exist;
        expect(created._id).to.eql(role._id);
        expect(created.name).to.exist;
        done(error, created);
      });
    });

  });

  after((done) => {
    Role.deleteMany(done);
  });

});
