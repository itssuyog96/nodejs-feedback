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

    console.log(req.body);
    var col_id=req.body.col_id;
    var dep_id=req.body.dept_id;
    var sem=req.body.sem;
    var db = req.db;
    //var regex = new Regex(/rate_\d\d\d\d_\d\d\d/);
    //var regexO = new Regex(/rate_\d\d\d/);
    /* Testing
    for (var key in req.body){
        if(key.length == 8){
            var a = key.split('_');
            var str = "remark_" + a[1];
            console.log(req.body[str]);

        }
    }*/
    for (var key in req.body) {
        if (key.length == 13) {
            //console.log(key);
            var a = key.split('_');

            const collection = db.get('rating');
            collection.insert({"col_id":col_id,"dept_id":dep_id,"sem":sem,"sub_id":a[1],"q_id":a[2],"v_rating":req.body[key],"year":req.year},
                function (er2,result) {
                    if (er2) throw er2;
                    else {
                        console.log('rating added : '+col_id+' '+dep_id+' '+sem+' '+a[1]+' '+a[2]+' '+req.body[key]+' '+req.year);
                    }
                })

        }
        else if(key.length == 8) {
            //console.log(key);
            var b = key.split('_');
            var str = "remark_"+ b[1];
            const collectionb = db.get('rating');
            collectionb.insert({"col_id":col_id,"dept_id":dep_id,"sem":sem,"sub_id": null ,"q_id":b[1],"v_rating":req.body[key],"remark":req.body[str],"year":req.year},
                function (er,result) {
                    if (er) throw er;
                    else {
                        console.log('rating added : '+col_id+' '+dep_id+' '+sem+' '+b[1]+' '+req.body[key]+' '+req.body[str]+' '+req.year);
                    }
                })
        }
    }
    /*
    var col_id=req.body.col_id;
    var dep_id=req.body.dept_id;
    var sem=req.body.sem;
    console.log(req.year);
    console.log(req.body);
    var db = req.db;

    const collection = db.get('subject');

    collection.find({"col_id":col_id,"dept_id":dep_id,"sem":sem},function(e,docs){
        var d = JSON.stringify(docs[0].sub_name);
        console.log(req.body.rate[1]);

        console.log(d);
        var count=docs.length;
        if (e) throw e;
        else {
            const collectiona = db.get('question');
            var k=0;
            for(var i=0;i<count;i++) {
                collectiona.find({"col_id":col_id,"dep_id":dep_id,"sem":sem,"sub_id": docs[i].sub_id}, function (er, docs_a) {
                    var sub_id=docs_a[0].sub_id;
                    var count2 = docs_a.length;
                    for (var j=0;j<count2;j++,k++)
                    {
                        const collectionb = db.get('rating');
                        console.log(req.body.rate[k]);
                        collectionb.insert({"col_id":col_id,"dept_id":dep_id,"sem":sem,"sub_id":sub_id,"q_id":docs_a[j].q_id, "quesn" : docs_a[j].question,"v_rating":req.body.rate[k],"year":req.year},
                        function (er2,result) {
                            if (er2) throw er2;
                            else {
                                console.log('rating added');
                            }
                        })
                    }
                    });
            }
        }
        });
        */


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

router.get('/generateurl', function (req, res, next){

    try{

        var contact = req.query['contact'];
        var username = req.query['username'];
        var nameH = req.query['nameH'];
        var key = req.query['key'];

        var proc = spawn('python',["../python-files/SMSMessage.py", contact, username, nameH, key]);
        console.log("Spawned!!!");

        proc.stdout.on('data', function (chunk){
            var textChunk = chunk.toString();
            console.log(textChunk)
        });

        console.log("Process finished");
        // sms.sendsms(req.body.contact, req.body.username, req.body.nameH, req.body.key);
    }
    catch(e){
        res.write(e);
        res.end();
    }

    res.writeHead(200, 'Sent Successfully!');
    res.end();


});

module.exports = router;