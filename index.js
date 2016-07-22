/*!
 * auth-middleware
 * Copyright(c) 2016 André Ivo
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */



/**
 * Module exports.
 * @public
 */
exports = module.exports = authRoutes;


/**
 * Functions defaults.
 * @private
 */


var unauthMessageFunction = function (res) {
    res.status(401).json({
        aviso: 'Stop man!',
        message: 'You dont have the password, you cannot enter.'
    });
};

var accessGranted = function (user, pwd) {
    return ((user === exports.userDefault) && (pwd === exports.pwdDefault));
};

Object.defineProperty(exports, 'userDefault', {
    writable: true
});

Object.defineProperty(exports, 'pwdDefault', {
    writable: true
});

Object.defineProperty(exports, 'unauthMessageFunction', {
    writable: true
});

/**
 * Makes it necessary to use password on all routes * 
 *
 * @param {string} [userDefault] A string representing user default  to compare user from message.
 * @param {string} [pwdDefault] A string representing password default to compare password from message.
 * @return {Function}
 * @public
 */

function authRoutes(userDefault, pwdDefault) {

    exports.userDefault = userDefault;
    exports.pwdDefault = pwdDefault;
    
    exports.unauthMessageFunction = unauthMessageFunction;
    exports.accessGranted = accessGranted;

    return function authRoutes(req, res, next) {

        var user = getUserFromRequest(req);
        var passwd = getPasswdFromRequest(req);
       
        if (exports.accessGranted(user,passwd)) {
            next();
        } else {
            exports.unauthMessageFunction(res);
        }
    };
}

/**
 * Function to get User from message.
 *
 * @param {Request} [req] Request from message
 * @private
 */
function getUserFromRequest(req) {
    //get in querystring
    var user = req.query.user || '';

    //get header
    if (user === '') {
        user = req.header('user') || '';
    }

    //get body
    if (user === '') {
        user = req.body.user || '';
    }
    return user;
}

/**
 * Function to get Passwd from message.
 *
 * @param {Request} [req] Request from message
 * @private
 */
function getPasswdFromRequest(req) {
    //get in querystring
    var passwd = req.query.passwd || '';

    //get header
    if (passwd === '') {
        passwd = req.header('passwd') || '';
    }

    //get body
    if (passwd === '') {
        passwd = req.body.passwd || '';
    }
    return passwd;
}

