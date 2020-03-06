/*******************************************
// bigco, inc
// account resources 
// 2020-02-01 : mamund
********************************************/

/*******************************************
// initialization and setup for DARRT
********************************************/
var express, router, bodyParser, actions, representation, 
  transitions, utils, templates, forms, metadata;

init();

// shared metadata for this service
metadata = [
  {name: "title", value: "BigCo Account Records"},
  {name: "author", value: "Mike Amundsen"},
  {name: "release", value: "1.0.0"}
];

// optional tracking middleware
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now() + " : " + req.headers.host + req.url)
  next()
});

// ***********************************************************
// public resources for the account service
// ***********************************************************

// home resource
router.get('/',function(req,res){
  var args = {};
  args.request = req;
  args.response = res;
  args.action = actions.home;
  args.type = "home";
  args.config = {
    metadata:metadata,
    templates:templates,
    forms:forms,
    filter:"home"
  }
  respond(args);  
});

// createAccount
router.post('/', function(req,res){
  var args = {};
  args.request = req;
  args.response = res;
  args.action = actions.create;
  args.type = "account";
  args.config = {
    metadata:metadata,
    templates:templates,
    forms:forms,
    filter:"list"
  }
  respond(args);
});

// list accounts
router.get('/list/',function(req,res){
  var args = {};
  args.request = req;
  args.response = res;
  args.action = actions.list;
  args.type = "account";
  args.config = {
    metadata:metadata,
    templates:templates,
    forms:forms,
    filter:"list"
  }
  respond(args);
});

// filter accounts
router.get('/filter/', function(req,res){
  var args = {};
  args.request = req;
  args.response = res;
  args.action = actions.filter;
  args.type = "account";
  args.config = {
    metadata:metadata,
    templates:templates,
    forms:forms,
    filter:"list"
  }
  respond(args);
});

// read account
router.get('/:id', function(req,res){
  var args = {};
  args.request = req;
  args.response = res;
  args.action = actions.read;
  args.type = "account";
  args.config = {
    metadata:metadata,
    templates:templates,
    forms:forms,
    filter:"item"
  }
  respond(args);
});

// update account
router.put('/:id', function(req,res){
  var args = {};
  args.request = req;
  args.response = res;
  args.action = actions.update;
  args.type = "account";
  args.config = {
    metadata:metadata,
    templates:templates,
    forms:forms,
    filter:"item"
  }
  respond(args);
});

// modify status of account
router.patch('/status/:id', function(req,res){
  var args = {};
  args.request = req;
  args.response = res;
  args.action = actions.status;
  args.type = "account";
  args.config = {
    metadata:metadata,
    templates:templates,
    forms:forms,
    filter:"item"
  }
  respond(args);
});

// modify limits of account
router.patch('/limits/:id', function(req,res){
  var args = {};
  args.request = req;
  args.response = res;
  args.action = actions.limits;
  args.type = "account";
  args.config = {
    metadata:metadata,
    templates:templates,
    forms:forms,
    filter:"item"
  }
  respond(args);
});

/***********************************************************************/

// initialize module
function init() {
  express = require('express')
  router = express.Router()
  bodyParser = require('body-parser');

  actions = require('./actions');
  representation = require('./representation');
  transitions = require('./transitions');
  utils = require('./lib/utils');

  // set up request body parsing & response templates
  router.use(bodyParser.json({type:representation.getResponseTypes()}));
  router.use(bodyParser.urlencoded({extended:representation.urlencoded}));

  // load response templates and input forms
  templates = representation.getTemplates();
  forms = transitions.forms;
}

// local resourfce handler function
function respond(args) {
  var request = args.request||null;
  var response = args.response||null;
  var action = args.action||null;
  var object = args.type||"";
  var config = args.config||{};

  return utils.handler(request,response,action,object,config);	
}

// publish the capability routes
module.exports = router

