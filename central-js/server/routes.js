'use strict';
var express = require('express');
var fs = require('fs');

var environment = process.env.NODE_ENV;

module.exports = function(app) {
        if (environment === 'development') {
          app.use('/', express.static(__dirname + '../../client/'));
          app.use('/img/', express.static(__dirname + '/../client/src/img/'));
          app.use('/data.json', function(req, res, next) {
            res.send(fs.readFileSync(__dirname + '/../client/src/data.json'));
            next();
          });
          app.use('/config.js', function(req, res, next) {
            res.send(fs.readFileSync(__dirname + '/../client/config.js'));
            next();
          });
          app.use('/jspm_packages', express.static(__dirname + '../../client/jspm_packages'));
          app.use('/build', express.static(__dirname + '/../client/build'));
        } else {
          app.use('/', express.static(__dirname + '/../client/build'));
        }
	app.use('/api/auth', require('./api/auth'));
	app.use('/api/account', require('./api/account/index'));
	app.use('/api/bankid', require('./api/bankid'));
	app.use('/api/documents', require('./api/documents/index'));
	app.use('/api/journal', require('./api/journal/index'));
	app.use('/api/login', require('./api/login/index'));
	app.use('/api/logout', require('./api/logout/index'));
	app.use('/api/places', require('./api/places/index'));
	app.use('/api/process-definitions', require('./api/process-definitions/index'));
	app.use('/api/process-form', require('./api/process-form'));
	app.get('/api/service', require('./api/service/index'));
	app.use('/api/service/documents', require('./api/service/documents'));
	app.use('/api/service/journal', require('./api/service/journal'));
	app.use('/api/service/flow', require('./api/service/flow'));
	app.use('/api/messages', require('./api/messages/index'));
	app.use('/api/services', require('./api/services'));
	app.post('/api/uploadfile', require('./api/uploadfile/post'));

	app.use('/', function(req, res, next) {
		res.render(__dirname + '../../client/build/index.html');
		next();
	});
};
