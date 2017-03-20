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

            collection.insert({"col_id":col_id, "survey_id":survey_id, "dept_id":dep_id,"sem":sem,"sub_id":a[1],"q_id":a[2],"v_rating":parseInt(req.body[key]), "prof_id" : a[3],"studentOver":""},
                function (er2,result) {
                    if (er2) console.log(er2);
                    else {
                    }
                })

        }
        else if (key.length == 18) {

            a = key.split('_');

            collection.insert({"col_id":col_id, "survey_id":survey_id, "dept_id":dep_id,"sem":sem,"sub_id":a[1],"q_id":a[2],"v_rating":parseInt(req.body[key]), "lab_id" : a[3],"studentOver":""},
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

            collection.insert({"col_id":col_id, "survey_id":survey_id, "dept_id":dep_id, "q_id":b[1],"v_rating":parseInt(req.body[key]),"remark":req.body[str],"studentOver":judge},
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
    collection.update({"col_id":req.body.col_id,"dept_id":req.body.dept_id,"sub_id":req.body.sub_id},{"$set":{"prof_id":req.body.prof_id}},function(e,docs){
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
                })
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
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        /*port: 25,
        tls:{
            rejectUnauthorized: false
        },*/
        auth: {
            user: 'thewirecoy@gmail.com',
            pass: 'Success@2020'
        }
    });
    console.log(leng);
    if(req.body.length == 1){

        collection.find({"_id": req.body['id[]']},function(e,docs){

            if (e) throw e;
            else {
                //console.log(JSON.stringify(docs));
                /*var i=1;
                setInterval(function () {
                    if(i<=5){
                        generate.generateSend(docs[0].contact,docs[0].email_id,docs[0].name,docs[0].password,docs[0]._id,req.body.surveyid, transporter);
                        i++;
                    }
                    else {
                        clearInterval();
                    }
                }, 1000);*/
                generate.generateSend(docs[0].contact,docs[0].email_id,docs[0].name,docs[0].password,docs[0]._id,req.body.surveyid, transporter);
                setTimeout(function () {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.write(docs[0].status);
                    res.end();
                }, 2000);
            }
        });
    }else{
        var i;
        /*setInterval(function () {
            console.log("i : " + i);
            if(i < leng){
                collection.find({"_id": req.body['id[]'][i]},function(e,docs){
                    if (e) throw e;
                    else {
                        //console.log(JSON.stringify(docs));
                        console.log(docs[0].name);
                        generate.generateSend(docs[0].contact,docs[0].email_id,docs[0].name,docs[0].password,docs[0]._id,req.body.surveyid, transporter);
                    }
                });
                i++;
            }else {
                console.log("clear interval");
                clearInterval();
            }
        }, 1000);
        setTimeout(function () {
            console.log("timeout");
            res.writeHead(200, 'Sent Successfully!');
            res.end();
        }, 15000);*/

        for(i=0; i<leng; i++){
            (function (a) {
                console.log(a);
                setTimeout(function () {
                    collection.find({"_id": req.body['id[]'][a]},function(e,docs){
                        if (e) throw e;
                        else {
                            //console.log(JSON.stringify(docs));
                            generate.generateSend(docs[0].contact,docs[0].email_id,docs[0].name,docs[0].password,docs[0]._id,req.body.surveyid, transporter);
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
        }, (leng+5)*1000);
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

router.post('/sub_rep',function (req ,res,next) {
    var db = req.db;
    var col_id = req.body.col_id;
    var dept_id = req.body.dept_id;
    var survey_id = req.body.survey_id;
    var prof_name;
    const collection = db.get('subject');
    const collectionb = db.get('test_rating_'+req.year);
    const collectionc = db.get(survey_id+'_'+col_id+'_'+dept_id+'_sub_report');
    collectionc.drop();
    const collectiond = db.get('professor');
    collection.find({"dept_id":dept_id,"col_id": col_id,"prof_id":{$ne: "NA" }},function (err,data) {
        if (err) {
            console.log(err);
            res.end();
        }
        else {

            data.forEach(function (item) {
                console.log(item.prof_id);
                collectiond.find({"col_id":col_id,"dept_id":dept_id,"prof_id":item.prof_id},function(perr,pdata){
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
                                    prof_name = pdata[0]?pdata[0].prof_name:"";
                                    console.log('value odf d:  ',d);
                                collectionc.insert({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id,"sem":item.sem,"sub_id":item.sub_id,"sub_name": item.sub_name,"prof_id": item.prof_id,"prof_name":prof_name,"report":d},function (e,done) {
                                    if(e){
                                        console.log(e);
                                        res.end();
                                    }
                                    else{
                                    console.log('done');
                                    }
                                });
                            }
                        });
                    }
                });
                //var db = req.db;

                // we can add survey id here by passing it in this function and puting that constraint on $match in aggregate

            });
            setTimeout(function(){res.end();},10000);
        }
    })

});


router.post('/prof_rep',function (req ,res,next) {
    var db = req.db;
    var col_id = req.body.col_id;
    var dept_id = req.body.dept_id;
    var survey_id = req.body.survey_id;
    const collection = db.get('professor');
    const collectionc = db.get(survey_id+'_'+col_id+'_'+dept_id+'_prof_report_strict');
    collectionc.drop();
    collection.find({"dept_id":dept_id,"col_id": col_id},function (err,data) {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            data.forEach(function (item) {

                console.log(item.prof_id);
                //var db = req.db;
                const collectionb = db.get('test_rating_' + req.year);
                // we can add survey id here by passing it in this function and puting that constraint on $match in aggregate
                collectionb.aggregate([{$match:{"prof_id" : item.prof_id,"col_id":col_id,"dept_id":dept_id}} ,
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
            setTimeout(function(){res.end();},5000);
        }



    })

});

router.post('/profR_rep',function (req ,res,next) {
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
                                    collectiond.aggregate([{$match:{"prof_id" : item.prof_id,"col_id":col_id,"dept_id":dept_id,"sub_id":sub.sub_id}} ,
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
                                    collectiond.aggregate([{$match:{"lab_id" : item.lab_id,"col_id":col_id,"dept_id":dept_id,"sub_id":sub.sub_id}} ,
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
                })

                // we can add survey id here by passing it in this function and puting that constraint on $match in aggregate

            });
            setTimeout(function(){res.end();},5000);
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
            collection.aggregate([{$match:{"studentOver":"overall"}},
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
            collection.aggregate([{$match:{"studentOver":"studentS"}},
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
            collection.aggregate([{$match:{"studentOver":"overall"}},
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

    const collection = db.get(survey_id+'_sub_report');
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

    const collection = db.get(/*survey_id+*/'lab_report');
    collection.find({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id},function (e,done) {
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

router.get('/get_prof_reports',function (req,res) {
    var db = req.db;
    var survey_id = req.query['survey_id'];
    var col_id = req.query['col_id'];
    var dept_id = req.query['dept_id'];

    console.log(survey_id, col_id, dept_id);

    const collection = db.get(/*survey_id+*/'profR_report');
    collection.find({"survey_id":survey_id,"col_id":col_id,"dept_id":dept_id},function (e,done) {
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


router.get('/get_sub_reports_excel',function (req,res) {
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

module.exports = router;