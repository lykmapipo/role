'use strict';


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { expect } = require('chai');
const { Role } = require(path.join(__dirname, '..', '..'));

describe('Role GetById', () => {

  before((done) => {
    Role.deleteMany(done);
  });

  let role;

  before((done) => {
    role = Role.fake();
    role.post((error, created) => {
      role = created;
      done(error, created);
    });
  });

  it('should be able to get an instance', (done) => {
    Role.getById(role._id, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(role._id);
      done(error, found);
    });
  });

  it('should be able to get with options', (done) => {

    const options = {
      _id: role._id,
      select: 'name'
    };

    Role.getById(options, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(role._id);
      expect(found.name).to.exist;

      //...assert selection
      const fields = _.keys(found.toObject());
      expect(fields).to.have.length(2);
      _.map([
        'description',
        'createdAt',
        'updatedAt'
      ], function (field) {
        expect(fields).to.not.include(field);
      });

      done(error, found);
    });

  });

  it('should throw if not exists', (done) => {
    const role = Role.fake();
    Role.getById(role._id, (error, found) => {
      expect(error).to.exist;
      expect(error.status).to.exist;
      expect(error.message).to.be.equal('Not Found');
      expect(found).to.not.exist;
      done();
    });
  });

  after((done) => {
    Role.deleteMany(done);
  });

});
