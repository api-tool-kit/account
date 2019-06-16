/*****************************************
 * account service for BigCo, Inc.
 * 2019-01 mamund
 *****************************************/
 
var express = require('express');
var app = express();
var account = require('./account');
var port = process.env.PORT || 8282;
 
app.use('/account',account);
app.listen(port, () => console.log(`account svc listening on port ${port}!`));
