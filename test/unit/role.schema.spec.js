'use strict';


/* dependencies */
const { expect } = require('@lykmapipo/mongoose-test-helpers');
const { Schema } = require('mongoose');
const { Permission } = require('@lykmapipo/permission');
const Role = require('../../lib/role.model');


describe('Role Schema', () => {

  it('should have type field', () => {
    const type = Role.path('type');

    expect(type).to.exist;
    expect(type).to.be.instanceof(Schema.Types.String);
    expect(type.options).to.exist;
    expect(type.options).to.be.an('object');
    expect(type.options.type).to.exist;
    expect(type.options.trim).to.be.true;
    expect(type.options.enum).to.exist;
    expect(type.options.index).to.be.true;
    expect(type.options.searchable).to.be.true;
    expect(type.options.fake).to.exist;
  });

  it('should have name field', () => {
    const name = Role.path('name');

    expect(name).to.exist;
    expect(name).to.be.instanceof(Schema.Types.String);
    expect(name.options).to.exist;
    expect(name.options).to.be.an('object');
    expect(name.options.type).to.exist;
    expect(name.options.required).to.be.true;
    expect(name.options.trim).to.be.true;
    expect(name.options.minlength).to.be.equal(1);
    expect(name.options.index).to.be.true;
    expect(name.options.unique).to.be.true;
    expect(name.options.searchable).to.be.true;
    expect(name.options.fake).to.exist;
  });


  it('should have description field', () => {
    const description = Role.path('description');

    expect(description).to.exist;
    expect(description).to.be.instanceof(Schema.Types.String);
    expect(description.options).to.exist;
    expect(description.options).to.be.an('object');
    expect(description.options.type).to.exist;
    expect(description.options.trim).to.be.true;
    expect(description.options.index).to.be.true;
    expect(description.options.searchable).to.be.true;
    expect(description.options.fake).to.exist;
  });

  it('should have permissions field', () => {

    const permissions = Role.path('permissions');

    expect(permissions).to.exist;
    expect(permissions).to.be.instanceof(Schema.Types.Array);
    expect(permissions.options).to.exist;
    expect(permissions.options).to.be.an('object');
    expect(permissions.options.type).to.exist;
    expect(permissions.options.ref).to.exist;
    expect(permissions.options.ref).to.be.equal(Permission.MODEL_NAME);
    expect(permissions.options.default).to.be.undefined;
    expect(permissions.options.index).to.be.true;
    expect(permissions.options.autopopulate).to.be.true;
  });

});
