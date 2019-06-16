var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');
var component = require('./simple-component');

var ejs = require('ejs');
var jsonView = '<%= body %>';

// set up request body parsing
router.use(bodyParser.json({type:[
    "application/json",
    "application/vnd.hal+json",
    "application/vnd.siren+json",
    "application/vnd.collection+json"
    ]}));
router.use(bodyParser.urlencoded({extended:true}));

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// config account object
var props = [
  'id',
  'division',
  'companyId',
  'spendingLimit',
  'discountPercentage',
  'status',
  'dateCreated',
  'dateUpdated'
]
var reqd = ['division','companyId','status'];

/*
division MUST be one of:
 - DryGoods
 - Hardware
 - Software
 - Grocery
 - Pharmacy
 - Military

 status MUST be one of:
 - suspended
 - pending
 - active
 - closed
*/
/***************************************
 * handle request events
 ***************************************/
// home
router.get('/', function (req, res) {
  res.send('{"home" : "{"name":"account", "rel" : "collection", href":"/account/list/"}}\n');
})

// create
router.post('/', function(req,res) {
  processPost(req,res).then(function(body) {
    body = itemLinks(body);
    body = {account:body};
    body = collectionLinks(body);
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
});

// list
router.get('/list/', function(req, res) {
  processList(req,res).then(function(body) {
    body = itemLinks(body);
    body = {account:body};
    body = collectionLinks(body);
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
});

// filter
router.get('/filter/', function(req, res) {
  processFilter(req,res).then(function(body){
    body = itemLinks(body);
    body = {account:body};
    body = collectionLinks(body);
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
});

// read
router.get('/:accountId', function(req, res) {
  processItem(req,res).then(function(body){
    body = itemLinks(body);
    body = {account:body};
    body = collectionLinks(body);
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
});

// update
router.put('/:accountId', function(req, res) {
  processUpdate(req,res).then(function(body){
    body = itemLinks(body);
    body = {account:body};
    body = collectionLinks(body);
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
});

// delete
router.delete('/:accountId', function(req, res) {
  processDelete(req,res).then(function(body){
    body = itemLinks(body);
    body = {account:body};
    body = collectionLinks(body);
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
});

module.exports = router


// handle links for each item
function itemLinks(list) {
  list.forEach(item => {
    item.links = [];
    item.links[0] = {rel:"read",href:"/account/" + item.id};
    item.links[1] = {rel:"update",href:"/account/" + item.id};
    item.links[2] = {rel:"delete",href:"/account/" + item.id};
});
  return list;
}

// handle collection links
function collectionLinks(list) {
    list.links = [];
    list.links[0] = {rel:"list",href:"/account/list"};
    list.links[1] = {rel:"add",href:"/account/list"};
    list.links[2] = {rel:"home",href:"/account/"};
    console.log(list);
  return list;
}

/****************************************
 * handle processing of request/responses
 ****************************************/

function processPost(req,res) {
  return new Promise(function(resolve,reject) {
    if(req.body) {
     var body = req.body;
     resolve(component({name:'account',action:'add',item:body,props:props,reqd:reqd}));
    }
    else {
      reject({error:"invalid body"});
    }
  });
};

function processList(req,res) {
  return new Promise(function(resolve,reject) {
    resolve(component({name:'account',action:'list'}));
  });
}

function processFilter(req,res) {
  return new Promise(function(resolve,reject){
    if(req.query && req.query.length!==0) {
      resolve(component({name:'account',action:'filter',filter:req.query}));
    }
    else {
      reject({error:"invalid query string"});
    }
  })
}

function processItem(req,res) {
  return new Promise(function(resolve,reject){
    if(req.params.accountId && req.params.accountId!==null) {
      var id = req.params.accountId;
      resolve(component({name:'account',action:'item',id:id}));
    } 
    else {
      reject({error:"missing id"});
    }
  });
}

function processUpdate(req,res) {
  var id,body;
  return new Promise(function(resolve,reject){
    id = req.params.accountId||null;
    body = req.body||null;
    if(id!==null && body!==null) {
       resolve(component(
         {name:'account',
          action:'update',
          id:id,
          item:body,
          props:props,
          reqd:reqd}));
     }
     else {
       reject({error:"missing id and/or body"});
     }
  });
}

function processDelete(req,res) {
  return new Promise(function(resolve,reject){
    if(req.params.accountId && req.params.accountId!==null) {
      var id = req.params.accountId;
      resolve(component({name:'account',action:'delete', id:id}));
    }
    else {
      reject({error:"invalid id"});
    }
  });
}
