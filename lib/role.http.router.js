'use strict';


/**
 * @apiDefine Role Role
 *
 * @apiDescription A representation on how a party(ies) acts or, in other words,
 * what roles the party(ies) plays in specific context or environment.
 *
 * It defines set of permissions(or access rights) that are applicable to a
 * specific party(ies).
 *
 * Its simply a named collection of Permissions.
 *
 * @see {@link https://en.wikipedia.org/wiki/Role-based_access_control}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */


/**
 * @apiDefine Role
 * @apiSuccess {String} _id Unique role identifier
 * @apiSuccess {String} [type=System] Human readable category of a role
 * @apiSuccess {String} name Unique human readable name of a role
 * @apiSuccess {String} [description] A brief summary about a role if available
 * i.e additional details that clarify what a role for
 * @apiSuccess {Object[]} [permissions] List of defined permits(access rights)
 * of a role
 * @apiSuccess {Date} createdAt Date when role was created
 * @apiSuccess {Date} updatedAt Date when role was last updated
 *
 */


/**
 * @apiDefine Roles
 * @apiSuccess {Object[]} data List of roles
 * @apiSuccess {String} data._id Unique role identifier
 * @apiSuccess {String} [data.type=System] Human readable category of a role
 * @apiSuccess {String} data.name Unique human readable name of a role
 * @apiSuccess {String} [data.description] A brief summary about a role if
 * available i.e additional details that clarify what a role for
 * @apiSuccess {Object[]} [data.permissions] List of defined permits(access rights)
 * of a role
 * @apiSuccess {Date} data.createdAt Date when role was created
 * @apiSuccess {Date} data.updatedAt Date when role was last updated
 * @apiSuccess {Number} total Total number of role
 * @apiSuccess {Number} size Number of roles returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest role
 * was last modified
 *
 */


/**
 * @apiDefine RoleSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "_id": "5b60785cc1ab060972b0442c",
 *   "type": "System",
 *   "name": "Administrator",
 *   "updatedAt": "2018-07-31T14:55:24.667Z",
 *   "createdAt": "2018-07-31T14:55:24.667Z"
 * }
 *
 */


/**
 * @apiDefine RolesSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "data": [
 *     {
 *       "_id": "5b60785cc1ab060972b0442c",
 *       "type": "System",
 *       "name": "Administrator",
 *       "updatedAt": "2018-07-31T14:55:24.667Z",
 *       "createdAt": "2018-07-31T14:55:24.667Z"
 *     }
 *   ],
 *   "total": 20,
 *   "size": 10,
 *   "limit": 10,
 *   "skip": 0,
 *   "page": 1,
 *   "pages": 2,
 *   "lastModified": "2018-07-29T10:11:38.111Z"
 * }
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { getString } = require('@lykmapipo/env');
const Router = require('@lykmapipo/express-common').Router;


/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/roles/:id';
const PATH_LIST = '/roles';
/* TODO const PATH_PERMISSION_LIST = '/roles/:id/permissions'; */
const PATH_SCHEMA = '/roles/schema/';


/* declarations */
const Role = require(path.join(__dirname, 'role.model'));
const router = new Router({
  version: API_VERSION
});


/**
 * @api {get} /roles List Roles
 * @apiVersion 1.0.0
 * @apiName GetRoles
 * @apiGroup Role
 * @apiDescription Returns a list of roles
 * @apiUse RequestHeaders
 * @apiUse Roles
 *
 * @apiUse RequestHeadersExample
 * @apiUse RolesSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getRoles(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  Role
    .get(options, function onGetRoles(error, results) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(results);
      }

    });

});


/**
 * @api {get} /roles/schema Get Role Schema
 * @apiVersion 1.0.0
 * @apiName GetRoleSchema
 * @apiGroup Role
 * @apiDescription Returns role json schema definition
 * @apiUse RequestHeaders
 */
router.get(PATH_SCHEMA, function getSchema(request, response) {
  const schema = Role.jsonSchema();
  response.status(200);
  response.json(schema);
});


/**
 * @api {post} /roles Create New Role
 * @apiVersion 1.0.0
 * @apiName PostRole
 * @apiGroup Role
 * @apiDescription Create new role
 * @apiUse RequestHeaders
 * @apiUse Role
 *
 * @apiUse RequestHeadersExample
 * @apiUse RoleSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, function postRole(request, response, next) {

  //obtain request body
  const body = _.merge({}, request.body);

  Role
    .post(body, function onPostRole(error, created) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(201);
        response.json(created);
      }

    });

});



/**
 * @api {get} /roles/:id Get Existing Role
 * @apiVersion 1.0.0
 * @apiName GetRole
 * @apiGroup Role
 * @apiDescription Get existing role
 * @apiUse RequestHeaders
 * @apiUse Role
 *
 * @apiUse RequestHeadersExample
 * @apiUse RoleSuccessResponse
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_SINGLE, function getRole(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  //obtain role id
  options._id = request.params.id;

  Role
    .getById(options, function onGetRole(error, found) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(found);
      }

    });

});


/**
 * @api {patch} /roles/:id Patch Existing Role
 * @apiVersion 1.0.0
 * @apiName PatchRole
 * @apiGroup Role
 * @apiDescription Patch existing role
 * @apiUse RequestHeaders
 * @apiUse Role
 *
 * @apiUse RequestHeadersExample
 * @apiUse RoleSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(PATH_SINGLE, function patchRole(request, response, next) {

  //obtain role id
  const _id = request.params.id;

  //obtain request body
  const patches = _.merge({}, request.body);

  Role
    .patch(_id, patches, function onPatchRole(error, patched) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(patched);
      }

    });

});



/**
 * @api {put} /roles/:id Put Existing Role
 * @apiVersion 1.0.0
 * @apiName PutRole
 * @apiGroup Role
 * @apiDescription Put existing role
 * @apiUse RequestHeaders
 * @apiUse Role
 *
 * @apiUse RequestHeadersExample
 * @apiUse RoleSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(PATH_SINGLE, function putRole(request, response, next) {

  //obtain role id
  const _id = request.params.id;

  //obtain request body
  const updates = _.merge({}, request.body);

  Role
    .put(_id, updates, function onPutRole(error, updated) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(updated);
      }

    });

});



/**
 * @api {delete} /roles/:id Delete Existing Role
 * @apiVersion 1.0.0
 * @apiName DeleteRole
 * @apiGroup Role
 * @apiDescription Delete existing role
 * @apiUse RequestHeaders
 * @apiUse Role
 *
 * @apiUse RequestHeadersExample
 * @apiUse RoleSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete(PATH_SINGLE, function deleteRole(request, response, next) {

  //obtain role id
  const _id = request.params.id;

  Role
    .del(_id, function onDeleteRole(error, deleted) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(deleted);
      }

    });

});


/* expose role router */
module.exports = router;
