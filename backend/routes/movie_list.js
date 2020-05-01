var express = require("express");
var router = express.Router();
var AWS = require("aws-sdk");

AWS.config.loadFromPath("./config.json");
AWS.config.apiVersion = {
  dynamodb: "latest",
};

const db = new AWS.DynamoDB.DocumentClient();

const movieTableName = "MovieList";

// users/:email/movie-list
router.get("/:email/movie-list", getList);

// users/:email/movie-rating
router.delete("/:email/movie-rating", deleteRating);
router.put("/:email/movie-rating", putRating);

// Get the user's list
function getList(req, res, next) {
  var params = {
    TableName: movieTableName,
    KeyConditionExpression: "#user = :user",
    ExpressionAttributeNames: {
      "#user": "username",
    },
    ExpressionAttributeValues: {
      ":user": req.params.email,
    },
  };

  db.query(params, function (err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      res.status(err.statusCode);
      res.send("Unable to query. See console for output.");
    } else {
      res.send(data.Items);
    }
  });
}

// Create or update a user's rating
function putRating(req, res, next) {
  var params = {
    TableName: movieTableName,
    Item: {
      username: req.params.email,
      tmdb_id: req.body.tmdb_id,
      rating: req.body.rating,
    },
  };

  db.put(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to put item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
      res.status(err.statusCode).end();
    } else {
      console.log("Put item successfully.");
      res.end();
    }
  });
}

// Delete a user's rating
function deleteRating(req, res, next) {
  var params = {
    TableName: movieTableName,
    Key: {
      username: req.params.email,
      tmdb_id: req.body.tmdb_id,
    },
    ConditionExpression: "attribute_exists(tmdb_id)",
  };

  db.delete(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to delete item. Error:",
        JSON.stringify(err, null, 2)
      );
      res.status(err.statusCode).end();
    } else {
      console.log("Deleted item successfully.");
      res.end();
    }
  });
}

module.exports = router;
