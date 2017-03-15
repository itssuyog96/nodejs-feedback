/**
 * Created by arun on 16/09/2016.
 */
var monk = require('monk');
var db = monk('mongodb://localhost:27017/feed-db');

//var db=require('../db-config');
var Subject=function (info) {

    this.data = {
        col_id: null,
        dept_id: null,
        sub_id: null,
        sub_name: null,
        sem: null
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
        var collection = db.get('subject');
        collection.insert(data,function(e,docs){

            console.log(docs);
            if (e) throw e;
            else{
                console.log('data added');
            }
        });

    };

    this.update = function (id, name) {
        var collection = db.get('subject');
        collection.update({"prof_id":id},{$set:{"prof_name":name}},function(e,docs){

            console.log(docs);
            if (e) throw e;
            else{
                console.log('data updated');
            }
        });
    };

    this.delete = function (col_id,dep_id,sub_id) {
        var collection = db.get('subject');
        collection.remove({"sub_id":sub_id, "col_id":col_id, "dept_id":dep_id},function(e,docs){
            if (e) throw e;
            else{
                console.log('data deleted');
            }
        });

    };

    this.retrieve =function (info) {
        db.query('SELECT * FROM `subject` WHERE `sub_id`=?'[info.sub_id],function (err,result) {

        })
    };


    this.getcol_id=function () {
        return this.data.col_id;

    };


    this.getdept_id=function () {
        return this.data.dept_id;

    };

    this.getsub_id=function () {
        return this.data.sub_id;
    };

    this.getsub_name=function () {
        return this.data.sub_name;

    };

    this.getsem = function () {
        return this.data.sem;
    }


};//end of subject class




module.exports=Subject;