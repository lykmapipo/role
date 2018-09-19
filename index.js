'use strict';


/**
 * @module Permission
 * @name Permission
 * @description An entity that defines how a party(ies) acts or, in other words,
 * what roles the party(ies) plays in specific context or environment.
 *
 * It defines set of permissions(or access rights) that are
 * applicable to to a specific party(ies).
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @licence MIT
 * @since  0.1.0
 * @version 0.1.0
 * @example
 *
 * const { app } = require('@lykmapipo/permission');
 * app.start();
 *
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const app = require('@lykmapipo/express-common');
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);


/* declarations */
const pkg = require(path.join(__dirname, 'package.json'));
const fields = [
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
];


/* extract information from package.json */
const info = _.merge({}, _.pick(pkg, fields));


/* export package(module) info */
exports.info = info;


/* import models */
const Role = require(path.join(__dirname, 'lib', 'role.model'));


/* export models */
exports.Role = Role;


/* import routers*/
const roleRouter =
  require(path.join(__dirname, 'lib', 'role.http.router'));


/* export party router */
exports.router = exports.roleRouter = roleRouter;


/* export app */
Object.defineProperty(exports, 'app', {
  get() {
    /* @todo bind oauth middlewares authenticate, token, authorize */
    app.mount(roleRouter);
    return app;
  }
});
