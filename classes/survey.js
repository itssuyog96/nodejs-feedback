var monk = require('monk');
var db = monk('mongodb://the-wire:Success%401996@ds061076.mlab.com:61076/feed-db');


//var db = require("../db-config");
var Survey =  function (info) {

    this.data = {
        survey_id: null,
        sem: null,
        year: null
    };
    this.set = function (info) {

        for( var s in this.data){
            if(this.data[s] != undefined){
                this.data = info[s];
            }
        }

    };
    console.log(this.data);
    var dat=JSON.stringify(this.data);
    var data=this.data;

    var collection = db.get('survey');
    collection.insert(data,function(e,docs){

        console.log(docs);
        if (e) throw e;
        else{
            console.log('data added');
        }
    });


    this.update = function (id) {
        var collection = db.get('survey');
        collection.update({"survey_id":id},function(e,docs){

            console.log(docs);
            if (e) throw e;
            else{
                console.log('data updated');
            }
        });
    };

    this.delete = function (id) {
        var collection = db.get('survey');
        collection.remove({"col_id":id},function(e,docs){

            console.log(docs);
            if (e) throw e;
            else{
                console.log('data deleted');
            }
        });

    };

    this.retrieve =function (info) {
        db.query('SELECT * FROM `Survey` WHERE `survey_id`=?'[info.survey_id],function (err,result) {

        })
    };

    this.getsurvey_id = function () {
        return this.data.survey_id;
    };

    this.getsem = function () {
        return this.data.sem;
    };

    this.getyear = function () {
        return this.data.year;
    }

};

module.exports = Survey;
