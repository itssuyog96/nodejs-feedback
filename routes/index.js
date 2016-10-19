var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });

var omkar={
  "col_id":"1",
  "dep_id":"1001",
  "prof_id":"2003",
  "prof_name":"Torna Kamble"
};
  var db = req.db;
  var collection = db.get('college');
  collection.find({"col_id":'1'},function(e,docs){
    var d = JSON.stringify(docs);

    console.log(d);


  });

  res.render('index', {"title" : "FEEDBACK SYSTEM"});

});

module.exports = router;
