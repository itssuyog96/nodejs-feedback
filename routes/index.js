var express = require('express');
var router = express.Router();
var crp = require('../functions/md5');
var GoogleURL = require('google-url');
var tiles = require('../dashmeta.json').hod;
var menu = require('../menu.json').hod;
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
  var collection = db.get('rating');
  //const passw = "omkar";
  //const password = crp.crypto(passw);
  //const passwordH = crp.crypto(password);

  collection.update({"col_id":"1"},{"$set":{"survey_id": "survey-2017-1-even"}},{ multi: true },function(e,docs){
    if (e) show(e);
    else {
      console.log("survey id added");
      res.end();
    }
  });
});

/*function addSubRate(req,res,sub_id,col_id,dept_id,sem,survey_id){
  console.log(sub_id);
  var db = req.db;
  var collectionb = db.get('rating');
  // we can add survey id here by passing it in this function and puting that constraint on $match in aggregate
  collectionb.aggregate([{$match:{"sub_id" : sub_id,"col_id":col_id,"dept_id":dept_id,"sem":sem}} ,
                        {$group :{"que_id":"$q_id" ,
                                   avrg : {$avg : "$v_rating"}
                        }},
                        {$project:{col_id:col_id , dept_id : dept_id , sem :sem , sub_id :sub_id , q_id : "$que_id",avgR :"$avrg",year:req.year,survey_id:survey_id}}
  ],function (er,d) {
    if (er) {
      show(er);
      res.end();
    }
    else {
      console.log(d);
    }
  });
  res.end()
}*/
router.get('/sub_rep',function (req ,res,next) {
  var db = req.db;
  var sem = "6";
  var col_id = "1";
  var dept_id = "1001";
  var survey_id = "survey-2017-1-even";
  const collection = db.get('subject');
  collection.find({"sem":sem,"dept_id":dept_id,"col_id": col_id},function (err,data) {
    if (err) {
      show(err);
      res.end();
    }
    else {
      data.forEach(function (item) {

        console.log(item.sub_id);
        //var db = req.db;
        const collectionb = db.get('rating');
        // we can add survey id here by passing it in this function and puting that constraint on $match in aggregate
        collectionb.aggregate([{$match:{"sub_id" : item.sub_id,"col_id":col_id,"dept_id":dept_id,"sem":sem}} ,
          {$group :{"_id":"$q_id" ,
            AvgScore :{$avg : "$v_rating"}
          }},
          {$project:{q_id :"$_id",avgR :"$AvgScore",_id:0}}
        ],function (er,d) {
          if (er) {
            show(er);
            res.end();
          }
          else {
            const collectionc = db.get('sub_report');
            collectionc.insert({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"sem":sem,"sub_id":item.sub_id,"sub_name": item.sub_name,"report":d},function (e,done) {
              console.log('done');
            })
          }
        });
      });
      setTimeout(function(){res.end();},10000);
    }



  })

});


router.get('/prof_rep',function (req ,res,next) {
  var db = req.db;
  var col_id = "1";
  var dept_id = "1001";
  var survey_id = "survey-2017-1-even";
  const collection = db.get('professor');
  collection.find({"dept_id":dept_id,"col_id": col_id},function (err,data) {
    if (err) {
      show(err);
      res.end();
    }
    else {
      data.forEach(function (item) {

        console.log(item.prof_id);
        //var db = req.db;
        const collectionb = db.get('rating');
        // we can add survey id here by passing it in this function and puting that constraint on $match in aggregate
        collectionb.aggregate([{$match:{"prof_id" : item.prof_id,"col_id":col_id,"dept_id":dept_id}} ,
          {$group :{"_id":"$q_id" ,
            AvgScore :{$avg : "$v_rating"}
          }},
          {$project:{q_id :"$_id",avgR :"$AvgScore",_id:0}}
        ],function (er,d) {
          if (er) {
            show(er);
            res.end();
          }
          else {
            const collectionc = db.get('prof_report');
            collectionc.insert({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"prof_id":item.prof_id,"prof_name": item.prof_name,"report":d},function (e,done) {
              if(e) {
                show(e);
                res.end();
              }
              console.log('done');
            })
          }
        });
      });
      setTimeout(function(){res.end();},15000);
    }



  })

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

router.get('/num',function (req,res,next) {
  var db = req.db;
  const collection = db.get('rating');

  collection.find({"col_id":"1","sem":"6"},function (er,data) {
    if(er) throw(er);
    else {
      data.forEach(function(da) {
        collection.update({
          "_id": da._id
          //"v_rating": da.v_rating
        }, {
          "$set": {
            "v_rating": parseInt(da.v_rating)
          }
        });

      });
      res.writeHead(200,'done');
      res.end();
    }
  });
});

module.exports = router;
