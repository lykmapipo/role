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
 * @licence MIT
 * @since  0.1.0
 * @version 0.1.0
 * @example
 *
 * const { app } = require('@lykmapipo/role');
 * app.start();
 *
 */


/* dependencies */
const { include } = require('@lykmapipo/include');
const { pkg } = require('@lykmapipo/common');
const { apiVersion } = require('@lykmapipo/env');
const app = require('@lykmapipo/express-common');
const Role = include(__dirname, 'lib', 'role.model');
const roleRouter = include(__dirname, 'lib', 'role.http.router');


/**
 * @name info
 * @description package information
 * @type {Object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.3.0
 * @version 0.1.0
 */
exports.info = pkg(
  'name', 'description', 'version', 'license',
  'homepage', 'repository', 'bugs', 'sandbox', 'contributors'
);


/**
 * @name Role
 * @description Role model
 * @type {mongoose.Model}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.3.0
 * @version 0.1.0
 */
exports.Role = Role;


/**
 * @name roleRouter
 * @description role http router
 * @type {express.Router}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.3.0
 * @version 0.1.0
 */
exports.roleRouter = roleRouter;


/**
 * @name apiVersion
 * @description http router api version
 * @type {String}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.3.0
 * @version 0.1.0
 */
exports.apiVersion = apiVersion();


/**
 * @name app
 * @description express app
 * @type {Object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
Object.defineProperty(exports, 'app', {
  get() {
    /* @todo bind oauth middlewares authenticate, token, authorize */
    app.mount(roleRouter);
    return app;
  }
});
