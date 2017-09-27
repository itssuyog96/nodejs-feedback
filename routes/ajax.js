/**
 * Created by adikr on 16-09-2016.
 */

var db = require('../db-config');
var express = require('express');
var router = express.Router();
var Professor = require('../classes/prof');
var Subject = require('../classes/subject');
var Department = require('../classes/dept');
var College = require('../classes/college');
var info = require('../tablemeta.json');
var generate = require('../functions/generate');
var md = require('../functions/md5');
const crp = require('../functions/md5');
const secret = 'Aditya';
var spawn = require('child_process').spawn;
var sms = require('../functions/py_sms');
const nodemailer = require('nodemailer');
var question = require('../questions.json')
//var Regex = require('regex');

/* GET home page. */
router.post('/load_colg', function (req, res, next) {

    var db = req.db;
    var collection = db.get('college');
    collection.find({},function(e,docs){
        var d = JSON.stringify(docs);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write('{"data":' + d + '}');
            res.end();
        }

    });
});


router.post('/load_dept', function (req, res, next) {

    var db = req.db;
    var q = JSON.stringify(req.body);
    console.log(req.body.col_id);
    console.log(q);
    var collection = db.get('department');

    collection.find({"col_id" : req.body.col_id},function(e,docs){
        var d = JSON.stringify(docs);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write('{"data":' + d + '}');
            res.end();
        }

    });
});



router.post('/load_prof', function (req, res, next) {

    var db = req.db;
    var collection = db.get('professor');
    collection.find(req.body,function(e,docs){
        var d = JSON.stringify(docs);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write('{"data":' + d + '}');
            res.end();
        }

    });
});

router.post('/load_sub', function (req, res, next) {

    var db = req.db;
    var collection = db.get('subject');
    collection.find(req.body,function(e,docs){
        var d = JSON.stringify(docs);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write('{"data":' + d + '}');
            res.end();
        }

    });
});

router.post('/del_prof', function (req, res, next) {

    try {

        prof = new Professor();

        prof.delete(req.body);

    } catch (e) {
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Professor deleted');
    res.end();

});

router.post('/update_prof', function (req, res, next) {

    try {
        prof = new Professor();

        prof.update(req.body.id, req.body.name);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Professor updated');
    res.end();
});

router.post('/add_prof', function (req, res, next) {

    try{
        prof = new Professor();

        prof.set(req.body);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Professor added');
    res.end();

});

router.post('/del_subject', function (req, res, next) {

    try {
        sub = new Subject();

        sub.delete(req.body.col_id,req.body.dept_id,req.body.sub_id);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Subject deleted');
    res.end();

});

router.post('/update_sub', function (req, res, next) {

    try {
        sub = new Subject();

        sub.update(req.body.id, req.body.name);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Subject updated');
    res.end();
});

router.post('/add_subject', function (req, res, next) {

    try{
        sub = new Subject();

        sub.set(req.body);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Subject added');
    res.end();

});

router.post('/del_dept', function (req, res, next) {

    try {
        var dept = new Department();

        console.log("Data delete request : " + JSON.stringify(req.body));
        dept.delete(req.body);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Department deleted');
    res.end();

});

router.post('/update_dept', function (req, res, next) {

    try {
        dept = new Department();

        dept.update(req.body.id, req.body.name);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Department updated');
    res.end();
});

router.post('/login', function(req, res){

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Authentication module in development...');
    res.end();
});

router.post('/add_dept', function (req, res, next) {

    try{
        dept = new Department();
        console.log("Request Values: "+JSON.stringify(req.body));
        dept.set(req.body);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Subject added');
    res.end();

});

router.post('/del_col', function (req, res, next) {

    try {
        col = new College();

        col.delete(req.body);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('College deleted');
    res.end();

});

router.post('/update_col', function (req, res, next) {

    try {
        col = new College();

        col.update(req.body.id, req.body.name);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('College updated');
    res.end();
});

router.post('/add_col', function (req, res, next) {

    try{
        col = new College();

        col.set(req.body);
    }catch (e){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error in database!' + e);
        res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('College added!');
    res.end();

});


router.post('/getQuestions', function (req, res, next) {

    var db = req.db;
    var collection = db.get('question');
    collection.find(req.body,function(e,docs){
        var d = JSON.stringify(docs);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(d);
            res.end();
        }

    });
});

router.post('/getSubject', function (req, res, next) {

    var db = req.db;
    var collection = db.get('subject');
    collection.find(req.body,function(e,docs){
        var d = JSON.stringify(docs);
        console.log(d);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(d);
            res.end();
        }

    });
});

router.post('/getrating', function (req, res, next) {

    var db = req.db;
    var collection = db.get('rating');
    collection.find(req.body,function(e,docs){
        var d = JSON.stringify(docs);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(d);
            res.end();
        }

    });
});

router.post('/submit', function (req, res, next) {

    var col_id  =   req.body.col_id;
    var dep_id  =   req.body.dept_id;
    var sem     =   req.body.sem;
    var survey_id = req.body.survey_id;
    var judge ;
    var db = req.db;

    var a, b, str;

    const collection = db.get('test_rating_' + req.year);

    for (var key in req.body) {
        if (key.length == 17) {
            a = key.split('_');

            collection.insert({"col_id":col_id, "survey_id":survey_id, "dept_id":dep_id,"sem":sem,"sub_id":a[1],"q_id":a[2],"v_rating":parseFloat(req.body[key]).toFixed(2), "prof_id" : a[3],"studentOver":""},
                function (er2,result) {
                    if (er2) console.log(er2);
                    else {
                    }
                })

        }
        else if (key.length == 18) {

            a = key.split('_');

            collection.insert({"col_id":col_id, "survey_id":survey_id, "dept_id":dep_id,"sem":sem,"sub_id":a[1],"q_id":a[2],"v_rating":parseFloat(req.body[key]).toFixed(2), "lab_id" : a[3],"studentOver":""},
                function (er2,result) {
                    if (er2) console.log(er2);
                    else {
                    }
                })

        }
        else if(key.length == 8) {

            b = key.split('_');
            str = "remark_"+ b[1];
            if(b[1][0] == '3'){
                judge = 'overall';
            }
            else if(b[1][0] == '4'){
                judge = 'studentS';
            }
            else {
                judge == null;
            }

            collection.insert({"col_id":col_id, "survey_id":survey_id, "dept_id":dep_id, "q_id":b[1],"v_rating":parseFloat(req.body[key]).toFixed(2),"remark":req.body[str],"studentOver":judge},
                function (er,result) {
                    if (er) console.log(er);
                    else {
                    }
                })
        }
    }

    setTimeout(function(){
        res.end()
    }, 5000);

});

router.post('/updateSub', function (req, res, next) {

    var db = req.db;
    var collection = db.get('subject');
    collection.update({"col_id":req.body.col_id,"dept_id":req.body.dept_id,"sub_id":req.body.sub_id},{"$set":{"prof_id":req.body.prof_id, "prof_dept_id": req.body.prof_dept_id}},function(e,docs){
        var d = JSON.stringify(docs);
        if (e) throw e;
        else {
            console.log('subject updated');
            res.end();
        }

    });
});

router.post('/fetchprof', function (req, res, next) {

    var db = req.db;
    const collection = db.get('subject');
    collection.find({"col_id":req.body.col_id,"dept_id":req.body.dept_id,"sub_id":req.body.sub_id},function(e,docs){
        //var d = JSON.stringify(docs);
        if (e) throw e;
        else {
            if(docs[0].prof_id) {
                const collectionb = db.get('professor');
                collectionb.find({"prof_id":docs[0].prof_id},function (er,doc1) {
                    if (er) throw er;
                    else {
                        var pass = {
                            id  : docs[0].prof_id,
                            name: doc1[0].prof_name
                        };
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.write(JSON.stringify(pass));
                        //res.writeHead(doc1[0].prof_name); just for name
                        res.end();
                    }

                });
            }
            else {
                res.write("NA");
                res.end();
            }
        }

    });
});


router.post('/getprof', function (req, res, next) {

    try {
        var db = req.db;
        const collection = db.get('professor');
        collection.find({"col_id": req.body.col_id, "dept_id": req.body.dept_id}, function (e, docs) {
            //var d = JSON.stringify(docs);
            if (e) throw e;
            else {
                res.writeHead(200, {'Content-Type': 'application/json'});
                console.log(docs);
                res.write(docs);
                res.end();
            }

        });
    }

    catch(error){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error !' + error);
        res.end();
    }
});






router.post('/getRating', function (req, res, next) {

    var db = req.db;
    var collection = db.get('rating');
    collection.find(req.body,function(e,docs){
        var d = JSON.stringify(docs);
        console.log(d);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(d);
            res.end();
        }
    });
});


router.post('/adminReg', function (req, res, next) {
    console.log(req.body);

    var password = generate.generatePassword();

    const passwordh1 = crp.crypto(password);
    console.log(passwordh1);

    //const passwordh2 = crypto.createHmac('sha256',secret).update(passwordh1).digest('hex');
    //const username = crypto.createHmac('sha256',secret).update(password).digest('hex');
try {
    var db = req.db;
    var collection = db.get('users');
    collection.insert({"col_id":req.body.col_id,"dep_id":req.body.dep_id,"nickname" : req.body.name,"name":req.body.username,"password":passwordh1,"contact":req.body.contact,"email_id":req.body.email_id,"reg":req.body.reg,"role":req.body.role,"key":""},function (e, docs) {
        if (e) throw e;
        else {
            console.log(docs);
            res.end();
        }

    });
}
catch(error){
    res.writeHead(500, {'Content-Type': 'text/html'});
    res.write('Error !' + error);
    res.end();
}
});

router.post('/changePassword', function (req, res, next) {
    try {
        var db = req.db;
        var collection = db.get('users');
        var password = crp.crypto(req.body.newpass);

        collection.update({"_id": req.body.id},{"$set":{"password":password}}, function (e, docs) {
            var d = JSON.stringify(docs);
            console.log(d);
            if (e) throw e;
            else {
                console.log('password changed');

                const collectionb = db.get('users');
                collectionb.update({"_id": req.body.id}, {'$set' : {"key" : null}}, function(e2, docs2){
                    if(e2) throw e2;

                    console.log('key deleted');
                });
                res.end();
            }

        });
    }
    catch(error){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error !' + error);
        res.end();
    }
});


router.post('/load_users', function (req, res, next) {

    var db = req.db;
    var collection = db.get('users');
    collection.find({"reg":"1"},function(e,docs){
        var d = JSON.stringify(docs);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            console.log(d);
            res.write(d);
            res.end();
        }

    });
});

router.post('/retrieve_stud', function (req, res, next) {

    //console.log("****RETRIEVE STUDENT****");
    //console.log(req.user);
    var db = req.db;
    var collection = db.get('student');
    collection.find({"col_id":req.user.col_id,"dep_id":req.user.dep_id, "sem":req.body.sem},function(e,docs){
        //var d = JSON.stringify(docs);
        if (e) {
            console.log("Error: " + e);
        }
        else {
            //console.log(docs);
            res.writeHead(200, {'Content-Type': 'application/json'});

            res.write(JSON.stringify(docs));
            res.end();
        }

    });
});


router.post('/create_survey', function (req, res, next) {

    var year = req.body.year;
    var semtype = req.body.sem;
    var col_id = req.body.col_id;

    var survey_id = "survey-"+year+"-"+col_id+"-"+semtype;

    try {
        var db = req.db;
        var collection = db.get('survey');
        collection.insert({"survey_id": survey_id,"col_id":req.body.col_id, "year": req.body.year,"semtype":req.body.sem, "status": '0'},function (e, docs) {
            if (e) throw e;
            else {
                console.log(docs);
                res.end();
            }

        });
    }
    catch(error){
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.write('Error !' + error);
        res.end();
    }
});


router.post('/getSurveyList', function (req, res, next) {

    var db = req.db;
    var collection = db.get('survey');
    collection.find(req.body,function(e,docs){
        var d = JSON.stringify(docs);
        console.log(d);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(d);
            res.end();
        }

    });
});


router.post('/getDeptList', function (req, res, next) {

    var db = req.db;
    var collection = db.get('department');
    collection.find(req.body,function(e,docs){
        var d = JSON.stringify(docs);
        console.log(d);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(d);
            res.end();
        }

    });
});

router.post('/getSemList', function (req, res, next) {

    var db = req.db;
    var collection = db.get('semester');
    collection.find(req.body,function(e,docs){
        var d = JSON.stringify(docs);
        console.log(d);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(d);
            res.end();
        }

    });
});

router.post('/getSurveyStatus', function (req, res, next) {

    var db = req.db;
    var collection = db.get('survey');
    collection.find(req.body,function(e,docs){
        var d = JSON.stringify(docs);
        console.log(d);
        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(d);
            res.end();
        }

    });
});



router.post('/changeSurveyStatus', function (req, res, next) {

    var db = req.db;
    var collection = db.get('survey');
    collection.update({"survey_id":req.body.survey_id},{"$set":{"status":req.body.status}},function(e,docs){

        if (e) throw e;
        else {
            res.end();
        }

    });
});


router.post('/activeSurvey', function (req, res, next) {

    var db = req.db;
    var collection = db.get('survey');
    collection.find({"col_id": req.user.col_id , "status": "1"},function(e,docs){

        if (e) throw e;
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(docs));
            res.end();
        }

    });
});

router.post('/sendAll', function (req, res, next) {
    var leng = parseInt(req.body.length, 10);
    var db = req.db;
    var collection = db.get('student');
    //var timeout = (leng + 10) * 1000;
    if(req.body.length == 1){
        collection.find({"_id": req.body['id[]']},function(e,docs){
            if (e) throw e;
            else {
                generate.generateSend(docs[0].contact,docs[0].email_id,docs[0].name,docs[0].password,docs[0]._id,req.body.surveyid, req.transporter);
                setTimeout(function () {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.write(docs[0].status);
                    res.end();
                }, 5000);
            }
        });
    }else{
        var i=0;
        var mail_timersetInterval = setInterval(function () {
            //console.log("start");
            if(i < leng){
                collection.find({"_id": req.body['id[]'][i]},function(e,docs){
                    if (e) throw e;
                    else {
                        if(docs[0].status != "2" && docs[0].status != "1"){
                            generate.generateSend(docs[0].contact,docs[0].email_id,docs[0].name,docs[0].password,docs[0]._id,req.body.surveyid, req.transporter);
                            console.log(docs[0].name + " : " + i);
                        }
                    }
                });
                i++;
            }else {
                //console.log("clear interval");
                clearInterval(mail_timersetInterval);
                setTimeout(function () {
                    //console.log("timeout");
                    res.writeHead(200, 'Sent Successfully!');
                    res.end();
                }, 5000);
            }
        }, 1500);

        /*for(i=0; i<leng; i++){
            (function (a) {
                console.log(a);
                setTimeout(function () {
                    collection.find({"_id": req.body['id[]'][a]},function(e,docs){
                        if (e) throw e;
                        else {
                            //console.log(JSON.stringify(docs));
                            generate.generateSend(docs[0].contact,docs[0].email_id,docs[0].name,docs[0].password,docs[0]._id,req.body.surveyid, req.body.transporter);
                        }
                    });
                }, 1000);
            })(i)
        }
        console.log("Timeout : " + (leng+1)*1000);
        setTimeout(function () {
            console.log("timeout");
            res.writeHead(200, 'Sent Successfully!');
            res.end();
        }, (leng+5)*1000);*/
    }
});

router.post('/done', function (req, res, next) {

    var db = req.db;
    var collection = db.get('student');
    collection.update({"_id": req.user._id} , {"$set":{"status": "2"}},function(e,docs){

        if (e) throw e;
        else {
            res.writeHead(200,'done');
            res.end();
        }
    });
});

router.post('/sub_rep',function(req ,res,next) {
    var db = req.db;
    var col_id = req.body.col_id;
    var dept_id = req.body.dept_id;
    var survey_id = req.body.survey_id;
    var i = 0;
    var j = 0;
    const collection = db.get('subject');
    const collectionb = db.get('test_rating_'+req.year);
    const collectionc = db.get(survey_id+'_'+col_id+'_'+dept_id+'_sub_report');
    collectionc.drop();
    const collectiond = db.get('professor');
    collection.find({"dept_id":dept_id,"col_id": col_id,"prof_id":{"$exists":true,$ne: "NA" }},function (err,data) {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            i = data.length;
            data.forEach(function (item) {
                console.log(item.prof_id);
                collectiond.find({"col_id":col_id,"prof_id":item.prof_id},function(perr,pdata){
                    if(perr){
                        console.log(perr);
                        res.end();
                    }
                    else {
                        console.log(pdata);

                        collectionb.aggregate([{$match:{"survey_id":survey_id,"sub_id" : item.sub_id,"col_id":col_id,"dept_id":dept_id,"prof_id":item.prof_id}} ,
                            {$group :{"_id":"$q_id" ,
                                AvgScore :{$avg : "$v_rating"}
                            }},
                            {$sort:{_id : 1}},
                            {$project:{q_id :"$_id",avgR :"$AvgScore",_id:0}}
                        ],function (er,d) {
                            if (er) {
                                console.log(er);
                                res.end();
                            }
                            else {

                                    console.log('value odf d:  ',d);
                                collectionc.insert({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"sem":item.sem,"sub_id":item.sub_id,"sub_name": item.sub_name,"prof_id": item.prof_id,"prof_name":pdata[0].prof_name,"report":d},function (e,done) {
                                    if(e){
                                        console.log(e);
                                        res.end();
                                    }
                                    else{
                                    console.log('done');
                                        j++;
                                    }
                                    if(j == i){
                                        res.writeHead(200,'Everything is done');
                                        res.end();
                                    }
                                });
                            }
                        });
                    }
                });
                //var db = req.db;

                // we can add survey id here by passing it in this function and puting that constraint on $match in aggregate

            });

        }
    })

});


router.get('/sub_excel_rep',function (req ,res,next) {
    var db = req.db;
    var col_id = "1";
    var dept_id = "1008";
    var survey_id = "survey-2017-1-even";
    var i = 0;
    var j = 0;
    const collection = db.get('subject');
    const collectionb = db.get('test_rating_'+req.year);
    const collectionc = db.get(survey_id+'_'+col_id+'_'+dept_id+'_sub_excel_report');
    collectionc.drop();
    const collectiond = db.get('professor');
    collection.find({"dept_id":dept_id,"col_id": col_id,"prof_id":{"$exists":true, $ne: "NA" }},function (err,data) {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            i = data.length;
            data.forEach(function (item) {
                console.log(item.prof_id);
                collectiond.find({"col_id":col_id,"prof_id":item.prof_id},function(perr,pdata){//bug dept_id should be removed
                    if(perr){
                        console.log(perr);
                        res.end();
                    }
                    else {
                        console.log("pdata:  ",pdata);

                        collectionb.aggregate([{$match:{"survey_id":survey_id,"sub_id" : item.sub_id,"col_id":col_id,"dept_id":dept_id,"prof_id":item.prof_id}} ,
                            {$group :{"_id":"$q_id" ,
                                reports :{$push : "$v_rating"}
                            }},
                            {$sort:{_id : 1}},
                            {$project:{q_id :"$_id",reports :"$reports",_id:0}}
                        ],function (er,d) {
                            if (er) {
                                console.log(er);
                                res.end();
                            }
                            else {

                                console.log('value odf d:  ',d);
                                collectionc.insert({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"sem":item.sem,"sub_id":item.sub_id,"sub_name": item.sub_name,"prof_id": item.prof_id,"prof_name":pdata[0].prof_name,"report":d},function (e,done) {
                                    if(e){
                                        console.log(e);
                                        res.end();
                                    }
                                    else{
                                        console.log('done');
                                        j++;
                                    }
                                    if(j == i){
                                        res.writeHead(200,'Everything is done');
                                        res.end();
                                    }
                                });
                            }
                        });
                    }
                });
                //var db = req.db;

                // we can add survey id here by passing it in this function and puting that constraint on $match in aggregate

            });

        }
    })

});



router.get('/sub_whole_rep',function (req ,res,next) {
    var db = req.db;
    var col_id = req.body.col_id;
    var dept_id = req.body.dept_id;
    var survey_id = req.body.survey_id;
    /*var prof_name;*/
    var i =0;
    var j = 0;
    const collection = db.get('subject');
    const collectionb = db.get('test_rating_'+req.year);
    const collectionc = db.get(survey_id+'_'+col_id+'_'+dept_id+'_sub_whole_report');
    collectionc.drop();
    const collectiond = db.get('professor');
    collectionb.aggregate([{$match:{"col_id":col_id,"dept_id":dept_id,"prof_id":{"$exists":true,"$ne": ""}}},

        {$group:{"_id":"$q_id"}},
        {$project:{q_id:"$_id",_id:0}}
    ],function (err,data) {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            i= data.length;
            console.log(i);
            data.forEach(function (item) {
                collectionc.insert({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"q_id":item.q_id,"reports":[]},function (quer,qudata) {
                    if(quer){
                        console.log(quer);
                        res.end();
                    }
                    else {
                        console.log(item.q_id);
                        collectionb.aggregate([{$match:{"q_id":item.q_id,"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id}},
                            {$group:{"_id":"$sub_id"}},
                            {$project:{sub_id : "$_id",_id : 0}}

                        ],function(serr,sdata){
                            if(serr){
                                console.log(serr);
                                res.end();
                            }
                            else {
                                console.log('subject data:  ',sdata);
                                sdata.forEach(function (subject) {
                                    if(subject.sub_id != null){
                                        collection.find({"col_id":col_id,"dept_id":dept_id,"sub_id":subject.sub_id},function (suber,subjdata){
                                            var subject = {
                                                sub_id : subjdata[0].sub_id,
                                                sub_name : subjdata[0].sub_name,
                                                sem : subjdata[0].sem,
                                                ratings : []
                                            };

                                            if(suber){
                                                console.log(suber);
                                                res.end();
                                            }
                                            else {
                                                if(subjdata){
                                                    collectionb.aggregate([{$match:{"q_id": item.q_id,"sub_id":subjdata[0].sub_id}},
                                                        {$group:{"_id":"$q_id",
                                                            reports :{$push: "$v_rating"}
                                                        }},
                                                        {$project:{reports:"$reports",_id:0}}
                                                    ],function (rerr,rdata) {
                                                        if(rerr){
                                                            console.log(rerr);
                                                            res.end();
                                                        }
                                                        else{
                                                            subject.ratings = rdata[0].reports.slice(0);
                                                            console.log('this is a subject   :   ',subject);
                                                            console.log('update to Database: ....................',item.q_id)
                                                            collectionc.update({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"q_id":item.q_id},{$push:{reports : subject}},
                                                                function (der,done) {
                                                                    if(der){
                                                                        console.log(der);
                                                                        res.end()
                                                                    }
                                                                    else {
                                                                        console.log('LAST done.................');
                                                                        j++
                                                                    }
                                                                    if(j == i){
                                                                        res.writeHead(200,'Everything is Done');
                                                                        res.end();
                                                                    }

                                                                }
                                                            )

                                                        }
                                                    })
                                                }

                                            }
                                        })
                                    }


                                })



                            }
                        });

                    }
                })
                //var db = req.db;

                // we can add survey id here by passing it in this function and puting that constraint on $match in aggregate

            });
            //setTimeout(function(){res.end();},3000);
        }
    })

});




router.get('/sub_whole_rep_sem',function (req ,res,next) {
    var db = req.db;
    var col_id = req.body.col_id;
    var dept_id = req.body.dept_id;
    var survey_id = req.body.survey_id;
    var sem = req.body.sem;
    /*var prof_name;*/
    var i =0;
    var j = 0;
    const collection = db.get('subject');
    const collectionb = db.get('test_rating_'+req.year);
    const collectionc = db.get(survey_id+'_'+col_id+'_'+dept_id+'_sub_whole_report_sem_'+sem);
    collectionc.drop();
    //const collectiond = db.get('professor');
    collectionb.aggregate([{$match:{"col_id":col_id,"dept_id":dept_id,"sem":sem,"prof_id":{"$exists":true,"$ne": ""}}},

        {$group:{"_id":"$q_id"}},
        {$sort : {_id : 1}},
        {$project:{q_id:"$_id",_id:0}}
    ],function (err,data) {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            i= data.length;
            console.log(i);
            data.forEach(function (item) {
                collectionc.insert({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"q_id":item.q_id,sem:sem,"reports":[]},function (quer,qudata) {
                    if(quer){
                        console.log(quer);
                        res.end();
                    }
                    else {
                        console.log(item.q_id);
                        collectionb.aggregate([{$match:{"q_id":item.q_id,"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"sem":sem}},
                            {$group:{"_id":"$sub_id"}},
                            {$sort:{_id : 1}},
                            {$project:{sub_id : "$_id",_id : 0}}

                        ],function(serr,sdata){
                            if(serr){
                                console.log(serr);
                                res.end();
                            }
                            else {
                                console.log('subject data:  ',sdata);
                                sdata.forEach(function (subject) {
                                   if(subject.sub_id != null){
                                       collection.find({"col_id":col_id,"dept_id":dept_id,"sub_id":subject.sub_id,sem:sem},function (suber,subjdata){
                                           var subject = {
                                               sub_id : subjdata[0].sub_id,
                                               sub_name : subjdata[0].sub_name,
                                               ratings : []
                                           };

                                           if(suber){
                                               console.log(suber);
                                               res.end();
                                           }
                                           else {
                                               if(subjdata){
                                                   collectionb.aggregate([{$match:{"q_id": item.q_id,"sub_id":subjdata[0].sub_id,"sem":sem}},
                                                       {$group:{"_id":"$q_id",
                                                        reports :{$push: "$v_rating"}
                                                       }},
                                                       {$project:{reports:"$reports",_id:0}}
                                                            ],function (rerr,rdata) {
                                                       if(rerr){
                                                           console.log(rerr);
                                                           res.end();
                                                       }
                                                       else{
                                                           subject.ratings = rdata[0].reports.slice(0);
                                                           console.log('this is a subject   :   ',subject);
                                                           console.log('update to Database: ....................',item.q_id);
                                                           collectionc.update({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"q_id":item.q_id,"sem":sem},{$push:{reports : subject}},
                                                           function (der,done) {
                                                               if(der){
                                                                   console.log(der);
                                                                   res.end()
                                                               }
                                                               else {
                                                                   console.log('LAST done.................');
                                                                   j++
                                                               }
                                                               if(j == i){
                                                                   res.writeHead(200,'Everything is Done');
                                                                   res.end();
                                                               }

                                                           }
                                                           )

                                                       }
                                                   })
                                               }

                                           }
                                       })
                                   }


                                })
                            }
                        });

                    }
                })
                  //var db = req.db;

                // we can add survey id here by passing it in this function and puting that constraint on $match in aggregate

            });
            //setTimeout(function(){res.end();},3000);
        }
    })

});






router.get('/prof_rep',function (req ,res,next) {
    console.log("HI");
    var db = req.db;
    var col_id = "1";
    var dept_id = "1008";
    var survey_id = "survey-2017-1-even";
    const collection = db.get('professor');
    const collectionb = db.get('test_rating_' + req.year);
    const collectionc = db.get(survey_id+'_'+col_id+'_'+dept_id+'_prof_report_strict');
    collectionc.drop();
    collectionb.aggregate([{$match:{"col_id":col_id,"dept_id":dept_id,"survey_id":survey_id}},
        {$group :{"_id":"$prof_id"}},
        {$project:{prof_id :"$_id"}}
        ],function(err,data) {
            if(err){
                console.log(err);
            }
        data.forEach(function (item) {

            if(item.prof_id){
                console.log(item.prof_id);
                collection.find({"prof_id":item.prof_id},function(eprof,profdata) {
                    console.log(profdata[0].prof_name);
                    collectionb.aggregate([{$match:{"survey_id":survey_id,"prof_id" : profdata[0].prof_id,"col_id":col_id,"dept_id":dept_id}} ,
                        {$group :{"_id":"$q_id" ,
                            AvgScore :{$avg : "$v_rating"}
                        }},
                        {$sort:{_id : 1}},
                        {$project:{q_id :"$_id",avgR :"$AvgScore",_id:0}}
                    ],function (er,d) {
                        if (er) {
                            console.log(er);
                            res.end();
                        }
                        else {
                            collectionc.insert({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"prof_id":item.prof_id,"prof_name": item.prof_name,"report":d},function (e,done) {
                                if(e) {
                                    console.log(e);
                                    res.end();
                                }
                                console.log('done');
                            })
                        }
                    });
                });

            }

            //var db = req.db;

            // we can add survey id here by passing it in this function and puting that constraint on $match in aggregate
            /**/
        });
       setTimeout(function(){res.end();},5000);

        }
    );
    /*collection.find({"dept_id":dept_id,"col_id": col_id},function (err,data) {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            data.forEach(function (item) {

                console.log(item.prof_id);
                //var db = req.db;

                // we can add survey id here by passing it in this function and puting that constraint on $match in aggregate
                collectionb.aggregate([{$match:{"survey_id":survey_id,"prof_id" : item.prof_id,"col_id":col_id,"dept_id":dept_id}} ,
                    {$group :{"_id":"$q_id" ,
                        AvgScore :{$avg : "$v_rating"}
                    }},
                    {$sort:{_id : 1}},
                    {$project:{q_id :"$_id",avgR :"$AvgScore",_id:0}}
                ],function (er,d) {
                    if (er) {
                        console.log(er);
                        res.end();
                    }
                    else {
                        collectionc.insert({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"prof_id":item.prof_id,"prof_name": item.prof_name,"report":d},function (e,done) {
                            if(e) {
                                console.log(e);
                                res.end();
                            }
                            console.log('done');
                        })
                    }
                });
            });

        }



    })*/

});

router.post('/profR_rep',function (req,res,next) {
    var db = req.db;
    var col_id = req.body.col_id;
    var dept_id = req.body.dept_id;
    var survey_id = req.body.survey_id;
    const collection = db.get('professor');
    const collectionb = db.get('subject');
    const collectiond = db.get('test_rating_'+ req.year);
    const collectionc = db.get(survey_id+'_'+col_id+'_'+dept_id+'_prof_report');
    collectionc.drop();
    collection.aggregate([{$match:{"col_id":col_id,"dept_id":dept_id}} ,
        {$group :{"_id":"$prof_id","prof_name":{"$first":"$prof_name"}}},
        {$project:{prof_id :"$_id",prof_name : 1}}
    ],function (err,data) {
        if (err) {
            console.log('FIRST      ',err);
            res.end();
        }
        else {
            //console.log(data);
            data.forEach(function (item) {

                console.log(item);
                collectionc.insert({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"prof_id":item.prof_id,"prof_name": item.prof_name,"subjects":[]},function (e,done) {
                    if(e) {
                        console.log(e);
                        res.end();
                    }
                    else {
                        console.log('prof added');
                        collectionb.aggregate([{$match:{"prof_id" : item.prof_id,"col_id":col_id,"dept_id":dept_id}} ,
                            /*{$group :{"_id":"$q_id"
                             /!*AvgScore :{$avg : "$v_rating"}*!/
                             }}*/
                            {$project:{prof_id : 1 , sub_id : 1 , sub_name : 1, sem : 1}}
                        ],function (er,d) {
                            if (er) {
                                console.log('SECOND            ',er);
                                res.end();
                            }
                            else {

                                //console.log(d);
                                d.forEach(function(sub) {
                                    collectiond.aggregate([{$match:{"survey_id":survey_id,"prof_id" : item.prof_id,"col_id":col_id,"dept_id":dept_id,"sub_id":sub.sub_id}} ,
                                        {$group :{"_id":"$q_id",
                                            AvgScore :{$avg : "$v_rating"}
                                        }},
                                        {$sort:{_id : 1}},
                                        {$project:{q_id : "$_id", avgR : "$AvgScore",_id : 0}}
                                    ],function (ser,sd){
                                        if(ser){
                                            console.log('Subject Add error       ',ser)
                                            res.end();
                                        }
                                        else {
                                            var subject = {
                                                "sub_id": sub.sub_id,
                                                "sub_name": sub.sub_name,
                                                "sem": sub.sem,
                                                "reports":   sd
                                            };

                                            //console.log('subject :    ',subject);
                                            //console.log('this is subjects   ',subjects);
                                            console.log('Subject Array  ',subject);
                                            collectionc.update({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"prof_id":item.prof_id,"prof_name": item.prof_name},
                                                {$push:{subjects: subject}},

                                                function (e,done) {
                                                    if(e) {
                                                        console.log('last    ',e);
                                                        res.end();
                                                    }
                                                    console.log('done');

                                                });
                                        }
                                    })
                                });

                            }
                        });
                    }
                })

                // we can add survey id here by passing it in this function and puting that constraint on $match in aggregate

            });
            setTimeout(function(){res.end();},5000);
        }



    })

});

router.post('/lab_rep',function (req ,res,next) {
    var db = req.db;
    var col_id = req.body.col_id;
    var dept_id = req.body.dept_id;
    var survey_id = req.body.survey_id;
    const collection = db.get('labs');
    const collectionb = db.get('subject');
    const collectiond = db.get('test_rating_'+ req.year);
    const collectionc = db.get(survey_id+'_'+col_id+'_'+dept_id+'_lab_report');
    collectionc.drop();
    collection.aggregate([{$match:{"col_id":col_id,"dept_id":dept_id}} ,
        {$group :{"_id":"$lab_id","lab_name":{"$first":"$lab_name"}}},
        {$project:{lab_id :"$_id",lab_name : 1}}
    ],function (err,data) {
        if (err) {
            console.log('FIRST      ',err);
            res.end();
        }
        else {
            //console.log(data);
            data.forEach(function (item) {

                console.log(item.lab_id);
                collectionc.insert({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"lab_id":item.lab_id,"lab_name": item.lab_name,"subjects":[]},function (e,done) {
                    if(e) {
                        console.log(e);
                        res.end();
                    }
                    else {
                        console.log('lab added');
                        collectionb.aggregate([{$match:{"lab_id" : item.lab_id,"col_id":col_id,"dept_id":dept_id}} ,
                            /*{$group :{"_id":"$q_id"
                             /!*AvgScore :{$avg : "$v_rating"}*!/
                             }}*/
                            {$project:{lab_id : 1 , sub_id : 1 , sub_name : 1}}
                        ],function (er,d) {
                            if (er) {
                                console.log('SECOND            ',er);
                                res.end();
                            }
                            else {

                                //console.log(d);
                                d.forEach(function(sub) {
                                    collectiond.aggregate([{$match:{"survey_id":survey_id,"lab_id" : item.lab_id,"col_id":col_id,"dept_id":dept_id,"sub_id":sub.sub_id}} ,
                                        {$group :{"_id":"$q_id",
                                            AvgScore :{$avg : "$v_rating"}
                                        }},
                                        {$sort:{_id : 1}},
                                        {$project:{q_id : "$_id", avgR : "$AvgScore",_id : 0}}
                                    ],function (ser,sd){
                                        if(ser){
                                            console.log('Subject Add error       ',ser)
                                            res.end();
                                        }
                                        else {
                                            var subject = {
                                                "sub_id": sub.sub_id,
                                                "sub_name": sub.sub_name,
                                                "reports":   sd
                                            };

                                            //console.log('subject :    ',subject);
                                            //console.log('this is subjects   ',subjects);
                                            console.log('Subject Array  ',JSON.stringify(subject));
                                            collectionc.update({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"lab_id":item.lab_id,"lab_name": item.lab_name},
                                                {$push:{subjects: subject}},

                                                function (e,done) {
                                                    if(e) {
                                                        console.log('last    ',e);
                                                        res.end();
                                                    }
                                                    console.log('done');

                                                });
                                        }
                                    })
                                });

                                /*setTimeout(function(){*/



                                /*},2500);*/
                                /*
                                 collectionc.insert({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"prof_id":item.prof_id,"prof_name": item.prof_name,"report":d},function (e,done) {
                                 if(e) {
                                 console.log(e);
                                 res.end();
                                 }
                                 console.log('done');
                                 })*/
                            }
                        });
                    }
                });

                // we can add survey id here by passing it in this function and puting that constraint on $match in aggregate

            });
            setTimeout(function(){res.end();},5000);
        }



    })

});

router.get('/lab_excel_rep',function (req ,res,next) {
    var db = req.db;
    var col_id = "1";
    var dept_id = "1001";
    var survey_id = "survey-2017-1-even";
    var i = 0;
    var j = 0;
    const collection = db.get('labs');
    const collectionb = db.get('test_rating_'+req.year);
    const collectionc = db.get(survey_id+'_'+col_id+'_'+dept_id+'_lab_excel_report');
    collectionc.drop();
    collection.find({"dept_id":dept_id,"col_id": col_id},function (err,data) {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            i = data.length;
            data.forEach(function (item) {
                console.log(item.lab_id);
                    collectionb.aggregate([{$match:{"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"lab_id":item.lab_id}},
                        {$group :{"_id":"$q_id",
                            reports :{$push : "$v_rating"}
                        }},
                        {$sort:{_id : 1}},
                        {$project:{q_id :"$_id",reports :"$reports",_id:0}}
                    ],function (er,d) {
                        if (er) {
                            console.log(er);
                            res.end();
                        }
                        else {

                            console.log('value odf d:  ',d);
                            collectionc.insert({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"lab_id": item.lab_id,"lab_name":item.lab_name,"report":d},function (e,done) {
                                if(e){
                                    console.log(e);
                                    res.end();
                                }
                                else{
                                    console.log('done');
                                    j++;
                                }
                                if(j == i){
                                    res.writeHead(200,'Everything is done');
                                    res.end();
                                }
                            });
                        }
                    });

                //var db = req.db;

                // we can add survey id here by passing it in this function and puting that constraint on $match in aggregate

            });

        }
    })

});



router.post('/overall_rep',function (req,res) {
    var db = req.db;
    var col_id = req.body.col_id;
    var dept_id = req.body.dept_id;
    var survey_id = req.body.survey_id;
    var collection = db.get('test_rating_'+req.year);
    var collectionb = db.get(survey_id+'_'+col_id+'_'+dept_id+'_overall_report');
    collectionb.drop();

    collectionb.insert({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"report":[]},function(err,done){
        if(err){
            console.log('1ST    ',err);
            res.end();
        }
        else {
            console.log('done');
            collection.aggregate([{$match:{"survey_id":survey_id,"studentOver":"overall"}},
                    {$group:{"_id":"$q_id",
                        AvgScore : {$avg: "$v_rating"}
                    }},
                    {$sort:{_id : 1}},
                    {$project : {q_id : "$_id", avgR : "$AvgScore" ,_id: 0} }
                ],
                function (er,data) {
                    if(er){
                        console.log(er);
                        res.end();
                    }
                    else {
                        console.log(data);
                        data.forEach(function(rate) {
                            console.log(rate);
                            collectionb.update({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id},{$push:{report:rate}},function(err,done){
                                if(err){
                                    console.log('2nd    ',err);
                                    res.end();
                                }
                                else {
                                    console.log('done');
                                }
                            });
                        })
                    }

                });
            setTimeout(function(){res.end();},5000);

        }
    });



});


router.post('/studentS_rep',function (req,res) {
    var db = req.db;
    var col_id = req.body.col_id;
    var dept_id = req.body.dept_id;
    var survey_id = req.body.survey_id;
    var collection = db.get('test_rating_'+req.year);
    var collectionb = db.get(survey_id+'_'+col_id+'_'+dept_id+'_studentSec_report');
    collectionb.drop();

    collectionb.insert({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"report":[]},function(err,done){
        if(err){
            console.log('1ST    ',err);
            res.end();
        }
        else {
            console.log('done');
            collection.aggregate([{$match:{"survey_id":survey_id,"studentOver":"studentS"}},
                    {$group:{"_id":"$q_id",
                        AvgScore : {$avg: "$v_rating"}
                    }},
                    {$sort:{_id : 1}},
                    {$project : {q_id : "$_id", avgR : "$AvgScore" ,_id: 0} }
                ],
                function (er,data) {
                    if(er){
                        console.log(er);
                        res.end();
                    }
                    else {
                        console.log(data);
                        data.forEach(function(rate) {
                            console.log(rate);
                            collectionb.update({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id},{$push:{report:rate}},function(err,done){
                                if(err){
                                    console.log('2nd    ',err);
                                    res.end();
                                }
                                else {
                                    console.log('done');
                                }
                            });
                        })
                    }

                })
            setTimeout(function(){res.end();},5000);

        }
    });



});

router.post('/remark_rep',function (req,res) {
    var db = req.db;
    var col_id = req.body.col_id;
    var dept_id = req.body.dept_id;
    var survey_id = req.body.survey_id;
    var collection = db.get('test_rating_'+req.year);
    var collectionb = db.get(survey_id+'_'+col_id+'_'+dept_id+'_remark_report');
    collectionb.drop();
    collectionb.insert({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"report":[]},function(err,done){
        if(err){
            console.log('1ST    ',err);
            res.end();
        }
        else {
            console.log('done');
            collection.aggregate([{$match:{"survey_id":survey_id,"studentOver":"overall"}},
                    {$group:{"_id":"$q_id",
                        remarks: { $addToSet: "$remark"}
                    }},
                    {$sort:{_id : 1}},
                    {$project : {q_id : "$_id", remarks : "$remarks" ,_id: 0} }
                ],
                function (er,data) {
                    if(er){
                        console.log(er);
                        res.end();
                    }
                    else {
                        data.forEach(function(rate) {
                            console.log(rate);
                            question.forEach(function(que){
                               if(que.qid == rate.q_id){
                                   rate.qname = que.question;
                               }
                            });
                            console.log(rate);

                            collectionb.update({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id},{$push:{report:rate}},function(err,done){
                                if(err){
                                    console.log('2nd    ',err);
                                    res.end();
                                }
                                else {
                                    console.log('done');
                                }
                            });
                        })
                    }

                })
            setTimeout(function(){res.end();},5000);

        }
    });



});

router.get('/get_sub_reports',function (req,res) {
    var db = req.db;
    var survey_id = req.query['survey_id'];
    var col_id = req.query['col_id'];
    var dept_id = req.query['dept_id'];
    var sem = req.query['sem'];
    console.log(survey_id, col_id, dept_id, sem);

    const collection = db.get(survey_id+'_'+col_id+'_'+dept_id+'_sub_report');
    collection.find({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"sem":sem},function (e,done) {
        if(e) {
            console.log(e);
            res.end();
        }
        else {
            console.log(JSON.stringify(done))
            res.writeHead(200,'Context-Type','application/json')
            res.end(JSON.stringify(done));
        }

    })



});

router.get('/get_lab_reports',function (req,res) {
    var db = req.db;
    var survey_id = req.query['survey_id'];
    var col_id = req.query['col_id'];
    var dept_id = req.query['dept_id'];

    console.log(survey_id, col_id, dept_id);

    const collection = db.get(survey_id+'_'+col_id+'_'+dept_id+'_lab_report');
    collection.find({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id},function (e,done) {
        if(e) {
            console.log(e);
            res.end();
        }
        else {
            console.log(JSON.stringify(done))
            //res.writeHead(200,'Context-Type','application/json')
            res.end(JSON.stringify(done));
        }

    })



});

router.get('/get_whole_reports',function (req,res) {
    var db = req.db;
    var survey_id = "survey-2017-1-even";
    var col_id = "1";
    var dept_id = "1001";
    var sem = "6";

    console.log(survey_id, col_id, dept_id);

    const collection = db.get(survey_id+'_'+col_id+'_'+dept_id+'_sub_whole_report_sem_' + sem);
    collection.aggregate([{$match : {"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id}},
        {$unwind : "$reports"},
        {$sort :{"reports.sub_id":1}},
        {$group : {_id: "$q_id" ,
            reports:{$push : "$reports"},
            survey_id : {"$first":"$survey_id"},
            col_id : {"$first":"$col_id"},
            dept_id : {"$first":"$dept_id"}
        }},
        {$project:{survey_id: 1,col_id :1,dept_id:1,q_id:"$_id",reports:1,_id:0}}

    ],function (e,done) {
        if(e) {
            console.log(e);
            res.end();
        }
        else {
            console.log(JSON.stringify(done));
            //res.writeHead(200,'Context-Type','application/json')
            //res.end(JSON.stringify(done));
        }

    })
});

router.get('/get_prof_reports',function (req,res) {
    var db = req.db;
    var survey_id = req.query['survey_id'];
    var col_id = req.query['col_id'];
    var dept_id = req.query['dept_id'];

    console.log(survey_id, col_id, dept_id);

    const collection = db.get(survey_id+'_'+col_id+'_'+dept_id+'_prof_report');
    collection.find({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id},function (e,done) {
        if(e) {
            console.log(e);
            res.end();
        }
        else {
            console.log(JSON.stringify(done))
            //res.writeHead(200,'Context-Type','application/json')
            res.end(JSON.stringify(done));
        }
    })
});


router.post('/get_sub_reports_excel',function (req,res) {
    //var db = req.db;
    var survey_id = req.body.survey_id;
    var col_id = req.body.col_id;
    var dept_id = req.body.dept_id;
    var sem = req.body.sem;
    console.log(survey_id, col_id, dept_id, sem);

    //questions = require('../questions.json');

    var proc = spawn('python',["python-files/subject_excel.py", survey_id, col_id, dept_id, sem]);
    console.log("Spawned!!!");

    proc.stdout.on('data', function (chunk){
        var textChunk = chunk.toString();
        console.log(textChunk)
    });
});

router.post('/get_dept_report_excel',function (req,res) {
    //var db = req.db;
    var survey_id = req.body.survey_id;
    var col_id = req.body.col_id;
    var dept_id = req.body.dept_id;

    console.log(survey_id, col_id, dept_id);

    //questions = require('../questions.json');

    var proc = spawn('python',["python-files/department_excel.py", survey_id, col_id, dept_id]);
    console.log("Spawned!!!");

    proc.stdout.on('data', function (chunk){
        var textChunk = chunk.toString();
        console.log("-" + textChunk)
        if(textChunk === "Omkar"){
            console.log("-------- Completed --------")

        }

    });

    proc.stderr.on('data', function(data){
        console.log(data.toString())
        res.writeHead(500, JSON.stringify(data.toString()))
    })

    setTimeout(function(){
        res.end()
    }, 3000);


});


router.post('/get_dept_whole_report_excel',function (req,res) {
    //var db = req.db;
    var survey_id = req.body.survey_id;
    var col_id = req.body.col_id;
    var dept_id = req.body.dept_id;

    console.log(survey_id, col_id, dept_id);

    //questions = require('../questions.json');

    var proc = spawn('python3',["python-files/dept_whole.py", survey_id, col_id, dept_id]);
    console.log("Spawned!!!");

    proc.stdout.on('data', function (chunk){
        var textChunk = chunk.toString();
        console.log("-" + textChunk)
        if(textChunk === "Omkar"){
            console.log("-------- Completed --------")

        }

    });

    proc.stderr.on('data', function(data){
        console.log(data.toString())
        res.writeHead(500, JSON.stringify(data.toString()))
    })

    setTimeout(function(){
        res.end()
    }, 3000);


});

router.post('/get_dept_whole_extended_report_excel',function (req,res) {
    //var db = req.db;
    var survey_id = req.body.survey_id;
    var col_id = req.body.col_id;
    var dept_id = req.body.dept_id;

    console.log(survey_id, col_id, dept_id);

    //questions = require('../questions.json');

    var proc = spawn('python3',["python-files/extended.py", survey_id, col_id, dept_id]);
    console.log("Spawned!!!");

    proc.stdout.on('data', function (chunk){
        var textChunk = chunk.toString();
        console.log("-" + textChunk)
        if(textChunk === "Omkar"){
            console.log("-------- Completed --------")

        }

    });

    proc.stderr.on('data', function(data){
        console.log(data.toString())
        res.writeHead(500, JSON.stringify(data.toString()))
    })

    setTimeout(function(){
        res.end()
    }, 3000);


});

router.post('/dummy',function (req,res) {
    setTimeout(function(){
        res.end()
    }, 2000)
});

router.post('/deleteuser', function(req, res){
    var db = req.db;

    const collection = db.get('users');

    collection.remove({'_id' : req.body._id}, function(e, done){
        if(e) throw e

        res.end()
    })
});


////////////////////////////////////////////// LAB OPERATIONS /////////////////////////////////////////////////////////

router.post('/addlab',function (req,res) {
    var db = req.db;
    const collection = db.get('labs');

    collection.insert(req.body,function(err,data) {
        if(err){
            console.log(err);
            res.end();
        }
        else {
            console.log('lab Added');
            res.writeHead(200,'lab Added');
            res.end();
        }
    });
});

router.post('/getlabs',function (req,res) {
    var db = req.db;
    const collection = db.get('labs');

    collection.find(req.body,function(err,data) {
        if(err){
            console.log(err);
            res.end();
        }
        else {
            console.log('lab Added');
            res.writeHead(200,'Content-Type','application/json');
            res.end('{"data" : '+JSON.stringify(data)+'}');
        }
    });
});

router.post('/getlab',function (req,res) {
    var db = req.db;
    const collection = db.get('labs');
    //const collections = db.get('subjects');

    collection.find(req.body,function(err,data) {
        if(err){
            console.log(err);
            res.end();
        }
        else {
            console.log('lab Added');
            res.writeHead(200,'Content-Type','application/json');
            res.end(JSON.stringify(data[0]));
        }
    });
});


router.post('/fetchlab',function (req,res) {

    var db = req.db;
    const collection = db.get('subject');
    collection.find({"col_id":req.body.col_id,"dept_id":req.body.dept_id,"sub_id":req.body.sub_id},function(e,docs){

        if (e) throw e;
        else {
            if(docs[0].lab_id) {
                const collectionb = db.get('labs');
                collectionb.find({"lab_id":docs[0].lab_id},function (er,doc1) {
                    if (er) throw er;
                    else {
                        var pass = {
                            id  : docs[0].lab_id,
                            name: doc1[0].lab_name
                        };
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.write(JSON.stringify(pass));
                        //res.writeHead(doc1[0].prof_name); just for name
                        res.end();
                    }

                });
            }
            else {
                res.write("NA");
                res.end();
            }
        }

    });

});// preassign

router.post('/updateSubLab',function(req,res){

    var db = req.db;
    const collection = db.get('subject');

    collection.update({"col_id":req.body.col_id,"dept_id":req.body.dept_id,"sub_id":req.body.sub_id},{"$set":{"lab_id":req.body.lab_id}},function(e,data) {
        if (e) throw e;
        else {
            console.log('subject updated');
            res.writeHead(200,'subject updated');
            res.end();
        }
    })

}); // update lab

router.post('/deleteLab',function(req,res){

    var db = req.db;
    const collection = db.get('labs');

    collection.remove({"col_id":req.body.col_id,"dept_id":req.body.dept_id,"lab_id":req.body.lab_id},function(e,data) {
        if (e) throw e;
        else {
            console.log('lab Deleted');
            res.writeHead(200,'lab Deleted');
            res.end();
        }
    })

});


////////////////////////////////////////////// MAIL AND CONTACT UPDATE /////////////////////////////////////////////////////////

router.post('/change_mail', function (req, res) {

    var db = req.db;
    const collection = db.get('users');

    /*console.log(req.body.new_email);
    console.log(req.body.name);
    console.log(req.body.role);*/

    collection.update({"nickname": req.body.name, "role": req.body.role}, {"$set":{"email_id": req.body.new_email}}, function (e, data) {
        if(e) throw e;
        else {
            console.log("email updated");
            res.end();
        }
    });

});

router.post('/change_contact', function (req, res) {

    var db = req.db;
    const collection = db.get('users');

    /*console.log(req.body.new_contact);
    console.log(req.body.name);
    console.log(req.body.role);*/

    collection.update({"nickname": req.body.name, "role": req.body.role}, {"$set":{"contact": req.body.new_contact}}, function (e, data) {
        if(e) throw e;
        else {
            console.log("contact updated");
            res.end();
        }
    });

});

router.post('/getSubjectReports', function (req, res) {

    var db = req.db;
    var survey_id = req.body.survey_id;
    var dept_id = req.body.dept_id;
    var sub_id = req.body.sub_id;
    const collection = db.get(survey_id + '_' + req.user.col_id + '_' + dept_id + '_sub_report');

    collection.find({"col_id": req.user.col_id, "dept_id" : dept_id, "survey_id": survey_id, "sub_id": sub_id}, function(e, data){
        if(e) {
            console.log(e)
        }
        else{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data[0]));
        }
    })
});

router.post('/getProfReports', function (req, res) {

    var db = req.db;
    var survey_id = req.body.survey_id;
    var dept_id = req.body.dept_id;
    var prof_id = req.body.prof_id;
    const collection = db.get(survey_id + '_' + req.user.col_id + '_' + dept_id + '_prof_report_strict');

    collection.find({"col_id": req.user.col_id, "dept_id" : dept_id, "survey_id": survey_id, "prof_id": prof_id}, function(e, data){
        if(e) {
            console.log(e)
        }
        else{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data[0]));
        }
    })
});


router.post('/get_comments', function (req, res) {

    var db = req.db;
    var survey_id = req.body.survey_id;
    var col_id = req.body.col_id;
    var dept_id = '1001';
    var collection = db.get(survey_id+'_'+col_id+'_'+dept_id+'_remark_report');

    collection.find({"col_id": col_id, "dept_id" : dept_id, "survey_id": survey_id}, function(e, data){
        if(e) {
            console.log(e)
        }
        else{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data[0]));
        }
    })
});

router.post('/getProfForDept', function (req, res) {

    var db = req.db;
    var col_id = req.body.col_id;
    var dept_id = req.body.dept_id;
    var collection = db.get('professor');

    collection.find({"col_id": col_id, "dept_id" : dept_id}, function(e, data){
        if(e) {
            console.log(e)
        }
        else{
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data));
        }
    })
});



module.exports = router;