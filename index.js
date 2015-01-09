'use strict';

var SETUP_ENDPOINT = 'https://setup.icloud.com/setup/ws/1';

var Session = require('./lib/session'),
	http = require('icloud-http-client');

// Exposes the 'login' functionality
exports.login = function(appleId, password, options, callback) {
	// Default options = twoStepAuthentication: false, extendedLogin: false
	var util = require('util'), uuid = require('uuid'),
		async = require('async');

	options = options ? options : {};
	var id = {};

	async.waterfall([
		// Grab the current build version
		function(callback) {
			http.get(
			{
				uri: util.format('%s/system/cloudos/current/version.json',
					http.origin()),
				headers: { 'User-Agent': http.userAgent() }
			},
			function(err, data) {
				return err ? callback(err, null) : callback(null, data);
			});
		},
		// Parse contents
		function(data, callback) {
			// Ugly
			try {
				return callback(null, JSON.parse(data));
			} catch(e) {
				return callback(e, null);
			}
		},
		// Attempt to login with uuid
		function(version, callback) {
			id.uuid = uuid.v4();
			id.build = version.buildNumber;

			var form = JSON.stringify({ apple_id: appleId, password: password,
				extended_login: false });

			http.post({
				uri: util.format('%s/login?clientBuildNumber=%s&clientId=%s',
					SETUP_ENDPOINT, id.build, id.uuid),
				form: form,
				headers: {
					'User-Agent': http.userAgent(),
					'Origin': http.origin(),
					'Content-Type': http.mime('json'),
					'Content-Length': form.length
				}
			}, function(err, data, cookies) {
				return err ? callback(err, null, null) :
					callback(null, data, cookies);
			});
		},
		// Parse contents again
		function(data, cookies, callback) {
			// Ugly
			try {
				return callback(null, { session: JSON.parse(data),
					cookies: cookies });
			} catch(e) {
				return callback(e, null);
			}
		}
	],
	function(err, contents) {
		if(!err && contents) {
			contents.session.id = id;
			return callback(null, Session.create(contents.cookies,
				contents.session));
		}
		else return null;
	});
};
