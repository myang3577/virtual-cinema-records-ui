var express = require("express");
var router = express.Router();
var movie_list = require("./movie_list");

// users
router.use("/", movie_list);

module.exports = router;
