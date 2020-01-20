/*****************************************
// bigco, inc
// company resources 
// 2020-02-01 : mamund
 *****************************************/

/*******************************************
// initialization and setup for DARRT
********************************************/
var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');

var actions = require('./actions');
var representation = require('./representation');
var transitions = require('./transitions');
var utils = require('./darrt/utils');

// set up request body parsing & response templates
router.use(bodyParser.json({type:representation.getResponseTypes()}));
router.use(bodyParser.urlencoded({extended:representation.urlencoded}));

// load response templates and input forms
var templates = representation.getTemplates();
var forms = transitions.forms;

// optional tracking middleware
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now() + " : " + req.headers.host + req.url)
  next()
})

/************************************************************************/

// shared metadata for this service
var metadata = [
  {name: "title", value: "BigCo Account Records"},
  {name: "author", value: "Mike Amundsen"},
  {name: "release", value: "1.0.0"} 
];


// ***********************************************************
// public resources for the cokmpany service
// ***********************************************************

// home resource
router.get('/',function(req,res){
  utils.handler(req,res,actions.home,"home", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms,
      filter:"home"
    }
  )
});

// createAccount
router.post('/', function(req,res){
  utils.handler(req,res,actions.create,"account", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms,
      filter:"home"
    }
  )
});

// list accounts
router.get('/list/',function(req,res){
  utils.handler(req,res,actions.list,"account", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms,
      filter:"list"
    }
  )
});

// filter accounts
router.get('/filter/', function(req,res){
  utils.handler(req,res,actions.filter,"account", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"list"
    }
  )
});

// read account
router.get('/:accountId', function(req,res){
  utils.handler(req,res,actions.read,"account", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

// update account
router.put('/:accountId', function(req,res){
  utils.handler(req,res,actions.update,"account", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

// modify status of account
router.patch('/status/:accountId', function(req,res){
  utils.handler(req,res,actions.status,"account", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

// modify limits of account
router.patch('/limits/:accountId', function(req,res){
  utils.handler(req,res,actions.status,"account", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

// remove account
/*
router.delete('/:accountId', function(req,res){
  utils.handler(req,res,actions.remove,"account", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});
*/

// publish the capability routes
module.exports = router
