/**
 * Created by itssu on 08-Oct-16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var user_info = req.session.passport.user;
    console.log("Request Session : "+JSON.stringify(req.session.passport.user));
    var db = req.db;

    const collection_a = db.get('college');
    collection_a.find({col_id : user_info.col_id}, function(err, docs){
        user_info.col_name = docs[0].col_name;
        console.log("Fetched College : "+JSON.stringify(docs));

        const collection_b = db.get('department');
        collection_b.find({col_id : user_info.col_id, dept_id: user_info.dep_id}, function(err, docs_b){
            user_info.dept_name = docs_b[0].dept_name;
            console.log("Fetched Dept : "+JSON.stringify(docs_b));

            user_info.namex = "Sem : "+ user_info.sem +" | Department : "+user_info.dept_name+" | College : "+user_info.col_name;
            console.log("Final User info : "+JSON.stringify(user_info));

            const collection_c = db.get('subject');
            collection_c.find(
                {col_id : user_info.col_id, dept_id: user_info.dep_id, sem : "5"}, function(err, docs_c){

                    console.log("Fetched Subjects : "+JSON.stringify(docs_c));
                    res.render('student', {user : user_info, subject : docs_c});

            });
        });
    });
});

module.exports = router;