'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const Role = require(path.join(__dirname, '..', '..', 'lib', 'role.model'));


describe('Role Schema', () => {

  it('should have name field', () => {

    const name = Role.schema.tree.name;
    const instance = Role.schema.paths.name.instance;

    expect(instance).to.be.equal('String');
    expect(name).to.exist;
    expect(name).to.be.an('object');
    expect(name.type).to.be.a('function');
    expect(name.type.name).to.be.equal('String');
    expect(name.required).to.be.true;
    expect(name.trim).to.be.true;
    expect(name.searchable).to.be.true;
    expect(name.index).to.be.true;
    expect(name.unique).to.be.true;

  });


  it('should have description field', () => {

    const description = Role.schema.tree.description;
    const instance = Role.schema.paths.description.instance;

    expect(instance).to.be.equal('String');
    expect(description).to.exist;
    expect(description).to.be.an('object');
    expect(description.type).to.be.a('function');
    expect(description.type.name).to.be.equal('String');
    expect(description.trim).to.be.true;
    expect(description.searchable).to.be.true;
    expect(description.index).to.be.true;

  });

  it('should have permissions field', () => {

    const permissions = Role.schema.tree.permissions;
    const instance = Role.schema.paths.permissions.instance;

    expect(instance).to.be.equal('Array');
    expect(permissions).to.exist;
    expect(permissions).to.be.an('object');
    expect(permissions.type[0]).to.be.a('function');
    expect(permissions.type[0].name).to.be.equal('ObjectId');
    expect(permissions.ref).to.exist;
    expect(permissions.ref).to.be.equal('Permission');
    expect(permissions.exists).to.be.true;
    expect(permissions.index).to.be.true;

  });

});
