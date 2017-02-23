var express = require('express');
var router = express.Router();
var crp = require('../functions/md5');
var GoogleURL = require('google-url');
googleUrl = new GoogleURL({key:'AIzaSyCGV2e7uvykKEnYr68QFZQyWxC1vWFy9O4'});
/* GET home page. */


router.get('/googleurl',function (req,res,next) {

  googleUrl.shorten( 'https://torrentproject.se/da80e487767c0795aaba7227676168eb2b8dca6d/Ashes-Cricket-2009-PC-torrent.html', function( err, shortUrl ) {

      console.log('inside');
      console.log(shortUrl);

  } );
  res.end();
});



router.get('/hash',function (req,res,next) {
  var db = req.db;
  var collection = db.get('users');
  const passw = "omkar";
  const password = crp.crypto(passw);
  const passwordH = crp.crypto(password);

  collection.update({"name":"Omkar"},{"$set":{"nameH":crp.crypto(''),"password":password,"passwordH":passwordH}},function(e,docs){
    if (e) show(e);
    else {
      console.log("user updated");
      res.end();
    }
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
