# simple-auth-middleware

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]
[![HitCount](http://hits.dwyl.io/andreivo/simple-auth-middleware.svg)](http://hits.dwyl.io/andreivo/simple-auth-middleware)

Middleware Framework for authentication of ExpressJS Routes.

## Installation

```sh
$ npm install simple-auth-middleware
```

## API Information
The simple-auth-middleware framework was developed to authenticate the web server routes proposed by ExpressJS.
Basically the module obtains the password informed in requests routes to be compared to the default username and password, or through a new authentication method that the developer can inform the Framework.
The parameters "user" and "passwd" to be sent in the QueryString in the header or body of the request on the x-www-form-urlencoded format.

### The constructor of the authentication module has two parameters that can be omitted:
 - userDefault: indicates the default user for authentication of the routes. If no atenticação method is set, all authentication will be based on this user.
 - passwordDefault: indicates the default password for authentication of the routes. If no atenticação method is set, all authentication will be based on this password.

If these parameters and a new authentication method are not informed authentication is not performed.

### Extension
The Framework allows extension through 4 key points.
 - userDefault: Sets the default user. This user is used for authentication when no method is passed by the developer;
```js
...
var authMiddle = require ( 'simple-auth-middleware');
authMiddle ( 'user.default' 'pswd.default');

authMiddle.userDefault = 'new.user.default';
...
```

 - pwdDefault: Set the default password. This password will be used for authentication when no method is passed by the developer;
```js
...
var authMiddle = require ( 'simple-auth-middleware');
authMiddle ( 'user.default' 'pswd.default');

authMiddle.pwdDefault = 'new.pswd.default';
...
```

 - unauthMessageFunction: This item allows the developer to change the return Response when authentication is denied. This point allows the developer to customize the message.
```js
...
var authMiddle = require ( 'simple-auth-middleware');
authMiddle ( 'user.default' 'pswd.default');

var unauthMessage = function (res) {
           res.status (401) .send ( '<h1> Stop Man </ h1><br><h3> You do not have the password, you can not enter <h3>.');
    };

authMiddle.unauthMessageFunction = unauthMessage;
...
```
- accessGranted: This item allows the developer to change the authentication method. This point allows the user to access a database and assess whether the user has access to functionality for example. The return of the function must be a boolean, true and false guarantees access denied.
```js
...
var authMiddle = require ( 'simple-auth-middleware');
authMiddle ( 'user.default' 'pswd.default');

var accessGranted = function (user, pwd) {
         userFromDB = findUserFromDB (user);
pwdFromDB = findPWDFromDB (pwd);
         return ((user === userFromDB) && (pwdFromDB === pwd));
    };

authMiddle.accessGranted = accessGranted;
...
```

## API for all Routes

- Simple use of the Framework, including authentication for all application routes.

```js
var express      = require('express');
var bodyParser   = require('body-parser');
var authMiddle   = require('simple-auth-middleware');

var app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(authMiddle('user.default','pswd.default'))
```

## API for Route-specific

- Using the Framework, only the specific routes of application.

```js
var express      = require('express');
var bodyParser   = require('body-parser');
var authMiddle   = require('simple-auth-middleware');

var app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

simpleAuth = authMiddle('user.default','pswd.default');

app.get('/test', function (req, res) {
    res.json({message: "auth test ok!!"});
});

app.post('/test', simpleAuth, function (req, res) {
    res.json({message: "auth post test ok!!"});
});

```

### [MIT Licensed](LICENSE)

[npm-image]: https://img.shields.io/npm/v/simple-auth-middleware.svg
[npm-url]: https://npmjs.org/package/simple-auth-middleware
[node-version-image]: https://img.shields.io/node/v/simple-auth-middleware.svg
[node-version-url]: https://nodejs.org/en/download
[downloads-image]: https://img.shields.io/npm/dm/simple-auth-middleware.svg
[downloads-url]: https://npmjs.org/package/simple-auth-middleware
