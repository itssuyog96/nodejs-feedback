var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/hash',function (req,res,next) {

  var collection = db.get('users');
  collection.remove(function(e,docs){
    var d = JSON.stringify(docs);

    console.log(d);


  });
});



router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });



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
