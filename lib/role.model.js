'use strict';


/**
 * @module Role
 * @name Role
 * @description An entity that defines how a party(ies) acts or, in other words,
 * what roles the party(ies) plays in specific context or environment.
 *
 * It defines set of permissions(or access rights) that are
 * applicable to to a specific party(ies).
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */


/* dependencies */
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
const env = require('@lykmapipo/env');
const actions = require('mongoose-rest-actions');
const { Permission } = require('@lykmapipo/permission');
const { getNumber, getStrings } = env;
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;


/* constants */
const ROLE_ADMINISTRATOR = 'Administrator';
const ROLE_MODEL_NAME = env('ROLE_MODEL_NAME', 'Role');
const ROLE_COLLECTION_NAME = env('ROLE_COLLECTION_NAME', 'roles');
const DEFAULT_ROLE_TYPE = env('DEFAULT_ROLE_TYPE', 'System');
const ROLE_TYPES = getStrings('ROLE_TYPES', DEFAULT_ROLE_TYPE);
const POPULATION_MAX_DEPTH = getNumber('POPULATION_MAX_DEPTH', 1);
const SCHEMA_OPTIONS =
  ({ timestamps: true, emitIndexErrors: true, collection: ROLE_COLLECTION_NAME });
const OPTION_AUTOPOPULATE = ({
  select: { type: 1, name: 1, description: 1 },
  maxDepth: POPULATION_MAX_DEPTH
});


/**
 * @name RoleSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const RoleSchema = new Schema({
  /**
   * @name type
   * @description Human readable category of a role.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} enum - list of acceptable values
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * System, Assignable etc.
   */
  type: {
    type: String,
    trim: true,
    enum: ROLE_TYPES,
    index: true,
    searchable: true,
    fake: true
  },


  /**
   * @name name
   * @description Unique human readable name of a role.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} index - ensure database index
   * @property {boolean} unique - ensure unique database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * Administrator, Accountant etc.
   */
  name: {
    type: String,
    trim: true,
    required: true,
    index: true,
    unique: true,
    searchable: true,
    fake: {
      generator: 'hacker',
      type: 'noun'
    },
  },


  /**
   * @name description
   * @description A brief summary about a role if available i.e
   * additional details that clarify what a role for.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  description: {
    type: String,
    trim: true,
    index: true,
    searchable: true,
    fake: {
      generator: 'lorem',
      type: 'sentence'
    }
  },


  /**
   * @name permissions
   * @description List of defined permits(access rights) of a role
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {object} default - default value if non provided
   * @property {boolean} exists - ensure ref exists before save
   * @property {boolean} index - ensure database index
   * @property {object} autopopulate - jurisdiction population options
   * select when populating
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  permissions: {
    type: [ObjectId],
    ref: Permission.MODEL_NAME,
    default: undefined,
    index: true,
    exists: true,
    autopopulate: true
  }

}, SCHEMA_OPTIONS);


/*
 *-------------------------------------------------------------------------------
 * RoleSchema Virtuals
 *-------------------------------------------------------------------------------
 */


/**
 * @name _assigned
 * @description obtain role permissions as a collection of role ids
 * @since 0.1.0
 * @version 0.1.0
 * @deprecated
 */
RoleSchema.virtual('_assigned').get(function () {

  //map permissions to collection of ids
  let permissions = _.chain(this.permissions).compact().uniq().map(function (
    permission) {
    return permission._id ? permission._id : permission;
  }).uniq().value();

  return permissions;

});


/**
 * @name _permissions
 * @description obtain role permissions as concatenated string
 * @since 0.1.0
 * @version 0.1.0
 * @deprecated
 */
RoleSchema.virtual('_permissions').get(function () {

  //map permissions object to strings
  let permissions =
    _.chain(this.permissions).compact().uniq().map(function (permission) {
      return permission.wildcard;
    }).uniq().value().join(', ');

  return permissions;

});


/*
 *------------------------------------------------------------------------------
 *  Hooks
 *------------------------------------------------------------------------------
 */


/**
 * @name validate
 * @function validate
 * @description role schema pre validation hook
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
RoleSchema.pre('validate', function (done) {

  this.preValidate(done);

});


/*
 *------------------------------------------------------------------------------
 *  Instance
 *------------------------------------------------------------------------------
 */


/**
 * @name preValidate
 * @description role schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
RoleSchema.methods.preValidate = function preValidate(done) {

  //ensure role type
  if (_.isEmpty(this.type)) {
    this.type = DEFAULT_ROLE_TYPE;
  }

  //ensure description
  if (_.isEmpty(this.description) && !_.isEmpty(this.name)) {
    this.description = [this.name, 'permissions'].join(' ');
  }

  //ensure permissions
  this.permissions =
    (_.isEmpty(this.permissions) ? undefined : this.permissions);

  done();

};


/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */


/* static constants */
RoleSchema.statics.MODEL_NAME = ROLE_MODEL_NAME;
RoleSchema.statics.COLLECTION_NAME = ROLE_COLLECTION_NAME;
RoleSchema.statics.DEFAULT_ROLE_TYPE = DEFAULT_ROLE_TYPE;
RoleSchema.statics.ROLE_TYPES = ROLE_TYPES;
RoleSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;


/**
 * @name upsert
 * @function upsert
 * @description upsert role
 * @param {role} role valid role details
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */
RoleSchema.statics.upsert = function upsert(role, done) {
  //normalize arguments
  const _role =
    (_.isFunction(role.toObject) ? role.toObject() : role);

  //refs
  const Role = this;

  //upsert
  async.waterfall([
    function findExistingRole(next) {
      const criteria = _.merge({}, _role);
      delete criteria.description;
      delete criteria.permissions;
      Role.findOne(criteria, next);
    },

    function upsertRole(found, next) {
      //instantiate if not found
      if (!found) {
        found = new Role(_role);
      }

      //upsert
      found.put(_role, next);
    }
  ], done);
};


/**
 * @name seed
 * @function seed
 * @description seed roles into database. On duplicate last changes will
 * override existing one.
 * @param {Role[]} [roles] set of permission(s) to seed
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */
RoleSchema.statics.seed = function seed(seeds, done) {
  //normalize arguments
  const _seeds = _.isFunction(seeds) ? [] : [].concat(seeds);
  const _done = _.isFunction(seeds) ? seeds : done;

  //obtain .env roles to seed
  let ROLE_SEED = getStrings('ROLE_SEED');
  ROLE_SEED = _.uniq(_.compact([].concat(ROLE_ADMINISTRATOR).concat(ROLE_SEED)));

  //refs
  const Role = this;

  //prepare roles
  let roles = _.map(ROLE_SEED, function (role) {
    return {
      name: role,
      description: role
    };
  });

  //merge provided roles
  roles = [].concat(roles).concat(_seeds);

  //upsert roles
  roles = _.map(roles, function (role) {
    return function upsertRoles(next) {
      Role.upsert(role, next);
    };
  });

  //seed roles
  async.parallel(roles, _done);

};


/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */


/* plug mongoose rest actions*/
RoleSchema.plugin(actions);


/* export role model */
module.exports = mongoose.model(ROLE_MODEL_NAME, RoleSchema);
