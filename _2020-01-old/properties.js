/*****************************************
 * account properties for BigCo, Inc.
 * 2019-01 mamund
 *****************************************/

// config message properties
exports.props = [
  'id',
  'status',
  'divisionType',
  'companyId',
  'spendingLimit',
  'discountPercentage',
  'salesRepId',
  'dateCreated',
  'dateUpdated'
];

exports.reqd = ['status','companyId', 'SalesRepId',];
exports.enums = [
  {status:['pending','active','suspended','closed']},
  {divisionType:['dry-goods','hardware','software','grocery','pharmacy','military']}
];

// config response/request types
exports.responseTypes = [
  "application/forms+json",
  "application/links+json",
  "application/json",
  "text/csv"
];
exports.urlencoded = true;
exports.allowCORS = "GET POST PUT DELETE PATCH OPTIONS HEAD";

exports.metadata = [
  {name:"title", value:"BigCo, Inc. Account API"},
  {name:"author", value:"Mike Amundsen, @mamund"}
];

exports.pageLinks = [
  {name:"home", href:"/", rel:"home"},
  {name:"list", href:"/list", rel:"collection"},
  {name:"create", href:"/", rel:"create"}
];

exports.itemLinks = [
  {name:"item","href":"/{:id}"},
  {name:"edit","href":"/{:id}"},
  {name:"status", "href":"status/?id={:id}"},
  {name:"close", "href":"close/?id={:id}"}
];

exports.pageForms = [
  {name:"home", href:"/", method:"get", properties:[]},
  {name:"list", href:"/", method:"get", properties:[]},
  {name:"create", href:"/", method:"post", 
    properties:[
      {name:"divisionType",value:""},
      {name:"companyId",value:"1q2w3e4r5t"},
      {name:"spendingLimit",value:"10000"},
      {name:"discountPercentage",value:"10"},
      {name:"salesRepId",value:"p0o9i8u7"}
    ]
  }
];

exports.itemForms - [
];


// ****************************************
// DORR REPRESENTATION
// response templates
// one for each media type format
// ****************************************
exports.templates = [
  { 
    comment : "simple array of JSON objects",
    format : "application/json", 
    view : 
    `
      { 
          "<%=type%>" : 
          [
            <%var x=0;%>
            <%rtn.forEach(function(item){%>
              <%if(x!==0){%>,<%}%>
              {
                <%var y=0;%>
                <%for(var p in item){%>
                  <%if(y!==0){%>,<%}%>"<%=p%>" : "<%=item[p]%>"
                  <%y=1;%>
                <%}%>
              }
              <%x=1;%>
            <%});%>
          ]
       }
    `
  },
  { 
    comment : "custom format that contains link metadata",
    format : "application/links+json", 
    view : 
    `
      { 
          "<%=type%>" : 
          { 
            "metadata" : 
            [
              <%var z=0;%>
              <%metadata.forEach(function(data){%>
                <%if(z!==0){%>,<%}%>
                {
                  <%var w=0;%>
                  <%for(var p in data){%>
                    <%if(w!==0){%>,<%}%>"<%=p%>" : "<%=data[p]%>"
                    <%w=1;%>
                  <%}%>  
                }
                <%z=1;%>
              <%});%>
            ],
            "links" : 
            [
              <%var z=0;%>
              <%pLinks.forEach(function(link){%>
                <%if(z!==0){%>,<%}%>
                {
                  <%var w=0;%>
                  <%for(var p in link){%>
                    <%if(w!==0){%>,<%}%>"<%=p%>" : "<%=link[p]%>"
                    <%w=1;%>
                  <%}%>  
                }
                <%z=1;%>
              <%});%>
            ],
            "items" : 
            [
              <%var x=0;%>
              <%rtn.forEach(function(item){%>
                <%if(x!==0){%>,<%}%>
                {
                  <%var y=0;%>
                  <%for(var p in item){%>
                    <%if(p==="id"){%>
                    "links" : [
                      <%var q=0;%>
                      <%iLinks.forEach(function(slink){%>
                        <%if(q!==0){%>,<%}%>
                        {
                          <%var r=0;%>
                          <%for(var s in slink){%>
                            <%if(r!==0){%>,<%}%>"<%=s%>" : "<%=slink[s]%>"
                            <%r=1;%>
                          <%}%>
                        }
                        <%q=1;%>
                      <%});%>  
                    ],
                    <%y=1;%><%}%>
                    <%if(y!==0){%>,<%}%>"<%=p%>" : "<%=item[p]%>"
                    <%y=1;%>
                  <%}%>
                }
                <%x=1;%>
              <%});%>
            ]
          }
       }
    `
  },
  { 
    comment : "custom format that contains links and forms metadata",
    format : "application/forms+json", 
    view : 
    `
      { 
          "<%=type%>" : 
          { 
            "forms" : 
            [
              <%var z=0;%>
              <%pForms.forEach(function(form){%>
                <%if(z!==0){%>,<%}%>
                {
                  <%var w=0;%>
                  <%for(var p in form){%>
                    <%if(w!==0){%>,<%}%>"<%=p%>" : <%if(Array.isArray(form[p])){%>
	              [
	              <%var a=0;%>
		      <%form[p].forEach(function(prop){%>
	                <%if(a!==0){%>,<%}%>
			{
			  <%var b=0;%>
			  <%for(var pr in prop){%>
			    <%if(b!==0){%>,<%}%>"<%=pr%>" : "<%=prop[pr]%>"
			    <%b=1;%>
			  <%}%>
			}
		      <%});%>
		      ]	      
	            <%}else{%>"<%=form[p]%>"<%}%>
                    <%w=1;%>
                  <%}%>  
                }
                <%z=1;%>
              <%});%>
            ],
            "items" : 
            [
              <%var x=0;%>
              <%rtn.forEach(function(item){%>
                <%if(x!==0){%>,<%}%>
                {
                  <%var y=0;%>
                  <%for(var p in item){%>
                    <%if(p==="id"){%>
                    "forms" : [
                      {"name" : "item", "href" : "/<%=item[p]%>", "method":"get","properties":[]},
                      {"name" : "edit", "href" : "/<%=item[p]%>", "method":"put","properties":[]},
                      {"name" : "status", "href" : "/<%=item[p]%>", "method":"patch","properties":[]},
                      {"name" : "close", "href" : "/<%=item[p]%>", "method":"post","properties":[]}
                    ]
                    <%y=1;%><%}%>
                    <%if(y!==0){%>,<%}%>"<%=p%>" : "<%=item[p]%>"
                    <%y=1;%>
                  <%}%>
                }
                <%x=1;%>
              <%});%>
            ]
          }
       }
    `
  },
  {
    format: "text/csv",
    view: 
    `<%var y=0;%><%for(var p in rtn[0]){%><%if(y!==0){%>,<%}%>"<%=p%>"<%y=1;%><%}%>
<%rtn.forEach(function(item){%><%var y=0;%><%for(var p in item){%><%if(y!==0){%>,<%}%>"<%=item[p]%>"<%y=1;%><%}%>
<%});%>`
  }
]
