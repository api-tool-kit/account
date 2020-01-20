// ****************************************
// bigco, inc
// data elements for account
// properties, requireds, and enums
// 2020-02-01 : mamund
// ****************************************

// this service's message properties
exports.props = [
  'id',
  'companyId',
  'division',
  'spendingLimit',
  'discountPercentage',
  'status',
  'dateCreated',
  'dateUpdated'
];

// required properties
exports.reqd = ['id','companyId','division','status'];

// enumerated properties
exports.enums = [
  {status:['pending','active','suspended','closed']},
  {division:['DryGoods','Hardware','Software','Grocery','Pharmacy','Military']}
];

