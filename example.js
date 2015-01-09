'use strict';

var icloud = require('./index');

var credentials = {
	appleId: 'YOUR_APPLE_ID',
	password: 'YOUR_PASSWORD'
}

// Login
icloud.login(credentials.appleId, credentials.password, {},
	function(err, session) {
		// This contains all the necessary session
		console.log(err ? err : session);
	}
);
