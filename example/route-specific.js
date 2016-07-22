/*!
 * auth-middleware
 * Copyright(c) 2016 André Ivo
 * MIT Licensed
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var auth = require('../index.js');
var authn = new auth('user.exemple','pswd123');

// Hotspots from framework
//
//
//var unauthMessage = function(res) {
//    res.status(401).send('<h1>Stop Man!</h1><br><h3>You dont have the password, you cannot enter.<h3>');
//};
//
//
//var accessGranted = function(user, pwd) {
//    console.log(user + " - " + pwd)
//    return (1===1);
//};
//
//
//auth.pwdDefault = 'senhasecreta';
//auth.userDefault = 'andre';
//auth.unauthMessageFunction = unauthMessage;
//auth.accessGranted = accessGranted;


app.get('/test', authn, function (req, res) {
    res.json({message: "auth test ok!!"});
});

app.post('/test', function (req, res) {
    res.json({message: "auth post test ok!!"});
});

app.listen(port);
console.log('Listening port ' + port);