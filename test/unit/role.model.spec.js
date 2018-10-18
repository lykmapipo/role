'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const Role = require(path.join(__dirname, '..', '..', 'lib', 'role.model'));


describe('Role Instance', () => {

  it('`preValidate` should be a function', () => {
    const role = Role.fake();
    expect(role.preValidate).to.exist;
    expect(role.preValidate).to.be.a('function');
    expect(role.preValidate.length).to.be.equal(1);
    expect(role.preValidate.name).to.be.equal('preValidate');
  });

});

describe('Role Validations', () => {

  it('should throw if no name', (done) => {
    const role = Role.fakeOnly('description');
    role.validate((error) => {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
      expect(error.errors.name).to.exist;
      expect(error.errors.name.name)
        .to.be.equal('ValidatorError');
      done();
    });
  });

  it('should throw if empty name', (done) => {
    const role = Role.fake();
    role.name = '';

    role.validate((error) => {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
      expect(error.errors.name).to.exist;
      expect(error.errors.name.name)
        .to.be.equal('ValidatorError');
      done();
    });
  });

});

describe('Role Statics', () => {

  it('should expose model name as constant', () => {
    expect(Role.MODEL_NAME).to.exist;
    expect(Role.MODEL_NAME).to.be.equal('Role');
  });

  it('should expose collection name as constant', () => {
    expect(Role.COLLECTION_NAME).to.exist;
    expect(Role.COLLECTION_NAME).to.be.equal('roles');
  });

});
