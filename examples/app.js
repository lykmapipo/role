'use strict';


/* ensure mongodb uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/role');


/* dependencies */
const path = require('path');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
const { start } = require('@lykmapipo/express-common');
const { getStrings } = require('@lykmapipo/env');
const {
  Role,
  roleRouter,
  info,
  app
} = require(path.join(__dirname, '..'));


/* establish mongodb connection */
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


function boot() {

  async.waterfall([

    function clear(next) {
      Role.deleteMany(function ( /*error, results*/ ) {
        next();
      });
    },

    function seedRole(next) {
      const roles = ['IT Officer', 'Billing Officer', 'Human Resource'];
      Role.seed(roles, next);
    }

  ], function (error, results) {

    /* expose module info */
    app.get('/', function (request, response) {
      response.status(200);
      response.json(info);
    });

    /* fire the app */
    start(function (error, env) {
      console.log(`visit http://0.0.0.0:${env.PORT}`);
    });

  });

}

boot();
