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
  var collection = db.get('survey');
  collection.update({"prof_id":"111"},{"$set":{"survey":"123"}},function(e,docs){
    var d = JSON.stringify(docs);

    console.log(d);


  });

  if(req.session.login) {
    //res.render('index', {"title": "FEEDBACK SYSTEM"});
    switch(req.user.role)
    {
      case 'admin':       choice ='/admin';
        break;

      case 'feed_analyzer':   choice ='/feed_analyzer';
        break;

      case 'principal':   choice ='/principal';
        break;

      case 'student':     choice ='/student';
        break;

      default:break;
    }
    res.redirect(choice);
  }
  else {
    req.session.redirectTo = '/';
    res.redirect('/login');
  }
});

module.exports = router;
