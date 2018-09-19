'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const Role = require(path.join(__dirname, '..', '..', 'lib', 'role.model'));


describe('Role Model', () => {

  describe('Validations', () => {
    //TODO
  });

  describe('Hooks', () => {
    //TODO
  });

  describe('Instance', () => {

    it('`preValidate` should be a function', () => {
      const role = Role.fake();
      expect(role.preValidate).to.exist;
      expect(role.preValidate).to.be.a('function');
      expect(role.preValidate.length).to.be.equal(1);
      expect(role.preValidate.name).to.be.equal('preValidate');
    });

  });

  describe('Statics', () => {

    it('should expose model name as constant', () => {
      expect(Role.MODEL_NAME).to.exist;
      expect(Role.MODEL_NAME).to.be.equal('Role');
    });

    it('should expose collection name as constant', () => {
      expect(Role.COLLECTION_NAME).to.exist;
      expect(Role.COLLECTION_NAME).to.be.equal('roles');
    });

  });

});
