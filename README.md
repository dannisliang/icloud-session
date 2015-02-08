# icloud-session
Manages an ICloud session

## Install
Since this is not yet available on npm, you can install the module by following
these steps:

1. Clone this repository

		$ git clone https://github.com/alexlincoln/icloud-session.git

2. Clone the `icloud-http-client` repository

		$ git clone https://github.com/alexlincoln/icloud-http-client.git

3. Install the `icloud-http-client` module

		$ npm install /path/to/icloud-http-client

## Example

```javascript
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
```

## API
### .login(appleId, password, [options], callback)
This function will attempt to login into ICloud and create a new
session. It takes three parameters, `appleId`, `password`, `callback` and one
optional parameter `options`. `callback` will
return an error or session depending on result. The `options` parameter allows for an `extendedLogin`
(bool) key, and/or the option to specify the `twoStepAuthentication` (bool) key.
Currently neither options supported as of yet,
rather only specified to be included for future releases. See above an example.

## Available Plugins
- `icloud-find-my-iphone-app` - Find My iPhone app (https://github.com/alexlincoln/icloud-find-my-iphone-app)
- `icloud-photos-app` - Photos app (https://github.com/alexlincoln/icloud-photos-app)

The following are coming soon:
- `icloud-contacts-app` - Contacts app
- `icloud-reminders-app` - Reminders app
- `icloud-calendar-app` - Calendar app
- `icloud-drive-app` - ICloud Drive app

## Bugs/Errors
Feel free to submit any errors or bugs that you may come across. Pull requests also are welcomed.

## TODO
- Support for Two Step Authentication
- Tests

## License
Copyright (c) 2015 alexlincoln

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
