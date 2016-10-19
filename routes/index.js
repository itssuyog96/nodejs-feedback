var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });


  var db = req.db;
  var collection = db.get('users');
  collection.find({},{},function(e,docs){
    var d = JSON.stringify(docs);
    res.render('index', { "userlist" : d , "title" : "FEEDBACK SYSTEM"});
  });

});

module.exports = router;
