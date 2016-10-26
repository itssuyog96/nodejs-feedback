/**
 * Created by adikr on 14-09-2016.
 */
var monk = require('monk');
var db = monk('mongodb://localhost:27017/feed-db');

//var db=require('../db-config');
var Professor=function (info) {

    this.data = {
        col_id: null,
        dept_id: null,
        prof_id: null,
        prof_name: null
    };
    this.set = function (info) {
        for(var p in this.data){
            if(this.data[p] !=='undefined'){
                this.data[p]=info[p];
            }

        }
        console.log(this.data);
        var dat=JSON.stringify(this.data);
        var data=this.data;

        var collection = db.get('professor');
        collection.insert(data,function(e,docs){

            console.log(docs);
            if (e) throw e;
            else{
                console.log('data added');
            }
        });

    };

    this.update = function (id, name) {
        var collection = db.get('professor');
        collection.update({"prof_id":id},{$set:{"prof_name":name}},function(e,docs){

            console.log(docs);
            if (e) throw e;
            else{
                console.log('data updated');
            }
        });
    };

    this.delete = function (col_id,dep_id,prof_id) {
        var collection = db.get('professor');
        collection.remove({"dep_id":dep_id, "col_id":col_id, "prof_id":prof_id},function(e,docs){

            console.log(docs);
            if (e) throw e;
            else{
                console.log('data deleted');
            }
        });

    };

    this.retrieve =function (info) {
            db.query('SELECT * FROM `professor` WHERE `col_id`=?'[info.col_id],function (err,result) {

            })
    };


    this.getcol_id=function () {
        return this.data.col_id;

    };


    this.getdept_id=function () {
        return this.data.dept_id;

    };

    this.getprof_id=function () {
        return this.data.prof_id;
    };

    this.getprof_name=function () {
        return this.data.prof_name;

    };


};//end of professor class




module.exports=Professor;