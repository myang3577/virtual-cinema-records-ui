var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk');
//NOTE ABOUT ENDPOINTS:
// IF YOU WANT TO CHANGE THE ENDPOINT, WHICH IS CURRENTLY NOT SET,
// ADD THE FOLLOWING TO THE BOTTOM OF THE JSON FILE TITLED config.json
// "endpoint" : "http://localhost:8000"
AWS.config.loadFromPath('./config.json');
AWS.config.apiVersion = {
    dynamodb:'latest'
};

var db = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var paramsSet1 = {
  AttributeDefinitions: [
    {
      AttributeName: 'CUSTOMER_ID',
      AttributeType: 'N'
    },
    {
      AttributeName: 'CUSTOMER_NAME',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'CUSTOMER_ID',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'CUSTOMER_NAME',
      KeyType: 'RANGE'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'CUSTOMER_LIST',
  StreamSpecification: {
    StreamEnabled: false
  }
};

var paramsSet2 = {
  TableName : "Users",
  KeyConditionExpression: "username = :a",
  // ExpressionAttributeNames:{
  //   "#yr": "year"
  // },
  ExpressionAttributeValues: {
    ":a": "Eric"
  }
};

var paramsSet3 = {
  TableName: 'Users',
  Key: {
    'username': {S: 'Eric'}
  },
  // ProjectionExpression: 'ATTRIBUTE_NAME'
  // TableName : "Users",
  // Key: {
  //   'username' : "Eric"
  // }
  // KeyConditionExpression: "username = :a",
  // // ExpressionAttributeNames:{
  // //   "#yr": "year"
  // // },
  // ExpressionAttributeValues: {
  //   ":a": "Eric"
  // }
};

router.get('/table-list', function(req, res, next){
    db.listTables(function(err,data){
        console.log(data.TableNames);
    });
    res.send('AWS - See the console plz');
});

// router.get('/checkLogin', (req, res, next) =>{
//   const docClient2 = new AWS.DynamoDB.DocumentClient();
//   let name = decodeURIComponent(req.query.name);
//   let password = decodeURIComponent(req.query.password);
//   req.match = "false";
//   console.log("querying");
//   // res.send("success1");
//
//   docClient2.query(paramsSet2, function(err, data){
//     if (err){
//       res.end("error");
//       console.log("error")
//     }else{
//       req.match = "true"
//       console.log("query success");
//       // res.set("Access-Control-Allow-Origin","*");
//       res.end("success2");
//     }
//   })
//   console.log("Out of query");
//   res.end();
// });


router.get("/checkLogin", getQuery);
// router.get("/checkLogin", getQuery, sendResponse);

function getQuery(req, res, next){
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  let name = decodeURIComponent(req.query.name);
  let password = decodeURIComponent(req.query.password);
  req.match = false;
  // docClient.getItem(paramsSet2, function(err,data){
  //
  // });
  console.log(paramsSet3);
  paramsSet3.Key.username.S = name.trim();
  console.log("name is: " + name);
  console.log("paramsSet3.Key.username.S is: " + paramsSet3.Key.username.S);
  console.log(paramsSet3);
  db.getItem(paramsSet3, function(err, data){
    if (err){
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    }else{
      console.log("Query succeeded for getItem.");
      console.log(data);
      if (Object.keys(data).length == 0){
        console.log("No data found!");
      }else{
        console.log(data.Item.username.S + " is cool");
        if ( data.Item.password.S.localeCompare(password) == 0) {
          req.match = true;
        }
      }

      res.send(req.match);

      // data.Items.forEach(function(item) {
      //   if ( item.password.localeCompare(password) == 0){
      //     // res.send(true);
      //     req.match = "true";
      //   }
      //   // if ( item.password == password){
      //   //   // res.send(true);
      //   //   match = true;
      //   // }
      //   // else{
      //   //   res.send(false);
      //   // }
      //   // console.log(" -", item.year + ": " + item.title);
      //   // res.send(match);
      //   console.log("print first");
      //   console.log(" - query password is:", item.password);
      //   console.log(" - parameter password is:",password);
      //   console.log(" - match is:", req.match);
      //   // next();
      // });

      // WORKING
      // req.match = "abc"
      // console.log("query success NOW");

      // res.set("Access-Control-Allow-Origin","*");
      // res.end("success2");
      // next();
      // res.send(req.match);

    }
  });

  // docClient.query(paramsSet2, function(err, data){
  //   if (err){
  //     console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
  //   }else{
  //
  //     console.log("Query succeeded.");
  //     console.log(data.Items);
  //     data.Items.forEach(function(item) {
  //       if ( item.password.localeCompare(password) == 0){
  //         // res.send(true);
  //         req.match = "true";
  //       }
  //       // if ( item.password == password){
  //       //   // res.send(true);
  //       //   match = true;
  //       // }
  //       // else{
  //       //   res.send(false);
  //       // }
  //       // console.log(" -", item.year + ": " + item.title);
  //       // res.send(match);
  //       console.log("print first");
  //       console.log(" - query password is:", item.password);
  //       console.log(" - parameter password is:",password);
  //       console.log(" - match is:", req.match);
  //       // next();
  //     });
  //
  //     // WORKING
  //     // req.match = "abc"
  //     // console.log("query success NOW");
  //
  //     // res.set("Access-Control-Allow-Origin","*");
  //     // res.end("success2");
  //     // next();
  //     res.send(req.match);
  //
  //   }
  // });

}

// function sendResponse(req, res, next){
//   console.log("SENDING")
//   res.send(req.match);
// }

// router.get('/aaa', (req, res, next) =>{
//
//   res.send("ok");
// });

// function callMeBack(){

// router.get('/checkLogin', getQuery, sendQuery);

// function getQuery(req, res, next){
//   next();
// }
//
// function sendQuery(req, res, next){
//   res.send("helloworld");
// }

// function getQuery(req,res,next){
//   // res.send('Hello world');
//
//   let name = decodeURIComponent(req.query.name);
//   let password = decodeURIComponent(req.query.password);
//   req.match = "false";
//   docClient.query(paramsSet2, function(err, data) {
//     if (err) {
//       console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
//     } else {
//       console.log("Query succeeded.");
//       data.Items.forEach(function(item) {
//         if ( item.password.localeCompare(password) == 0){
//           // res.send(true);
//           req.match = "true";
//         }
//         // if ( item.password == password){
//         //   // res.send(true);
//         //   match = true;
//         // }
//         // else{
//         //   res.send(false);
//         // }
//         // console.log(" -", item.year + ": " + item.title);
//         // res.send(match);
//         console.log("print first");
//         console.log(" - query password is:", item.password);
//         console.log(" - parameter password is:",password);
//         console.log(" - match is:", req.match);
//         next();
//       });
//     }
//     console.log("sending response");
//     res.send("Hello");
//   });
//   // console.log("print third");
//
// }

// function sendQuery(req, res, next){
//   console.log("print second");
//   // res.send("Hello");
//   // res.status(404).send("Can't find it!");
//   // res.header("Access-Control-Allow-Origin","*");
//   // res.set("Access-Control-Allow-Origin","*");
//   // res.send(req.match);
// }

// router.get('/checkLogin', function(req, res, next){
//   // console.log(req.query.name);
//   // console.log(decodeURIComponent(req.query.name));
//   let name = decodeURIComponent(req.query.name);
//   let password = decodeURIComponent(req.query.password);
//   let match = "false";
//   docClient.query(paramsSet2, function(err, data) {
//     if (err) {
//       console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
//     } else {
//       console.log("Query succeeded.");
//       data.Items.forEach(function(item) {
//         if ( item.password.localeCompare(password) == 0){
//           // res.send(true);
//           match = "true";
//         }
//         // if ( item.password == password){
//         //   // res.send(true);
//         //   match = true;
//         // }
//         // else{
//         //   res.send(false);
//         // }
//         // console.log(" -", item.year + ": " + item.title);
//         // res.send(match);
//         console.log("print first");
//         console.log(" - query password is:", item.password);
//         console.log(" - parameter password is:",password);
//         console.log(" - match is:", match);
//       });
//     }
//     console.log("print second");
//     res.send(match);
//   });
//   console.log("print third");
//
//   res.send(null);
//   // next();
//   // res.send(match);
//
//   // db.listTables(function(err,data){
//   //   console.log(data.TableNames);
//   // });
//   // res.send(match);
//   // res.send('AWS - See the console plz');
// });

// router.get('/somePath', function(req, res, next){
//
// }

module.exports = router;