'use strict';


/* dependencies */
const _ = require('lodash');
const { expect } = require('@lykmapipo/mongoose-test-helpers');
const { Role } = require('../..');

describe('Role Seed', () => {

  let permissions;

  before((done) => {
    Role.deleteMany(done);
  });

  it('should be able to seed', (done) => {
    Role.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      permissions = seeded;
      done(error, seeded);
    });
  });

  it('should not throw if seed exist', (done) => {
    Role.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should seed provided', (done) => {
    const seed = { name: 'IT Officer' };
    Role.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, seed)).to.exist;
      done(error, seeded);
    });
  });

  it('should seed provided', (done) => {
    const seed = { name: 'IT Officer' };
    Role.seed([seed], (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, seed)).to.exist;
      done(error, seeded);
    });
  });

  it('should not throw if provided exist', (done) => {
    const seed = { name: 'IT Officer' };
    Role.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, seed)).to.exist;
      done(error, seeded);
    });
  });

  it('should seed .env resources', (done) => {
    process.env.ROLE_SEED = 'IT Officer,Billing Officer';
    Role.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { name: 'IT Officer' })).to.exist;
      expect(_.find(seeded, { name: 'Billing Officer' })).to.exist;
      done(error, seeded);
    });
  });

  after((done) => {
    Role.deleteMany(done);
  });

});
