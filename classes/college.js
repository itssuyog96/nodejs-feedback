/**
 * Created by arun on 16/09/2016.
 */
var monk = require('monk');
var db = monk('mongodb://the-wire:Success%401996@ds061076.mlab.com:61076/feed-db');

//var db=require('../db-config');
var College=function (info) {

    this.data = {
        col_id: null,
        col_name: null
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
        var collection = db.get('college');
        collection.insert(data,function(e,docs){

            console.log(docs);
            if (e) throw e;
            else{
                console.log('data added');
            }
        });
    };


    this.updateit = function (id, name) {
        var collection = db.get('college');
        collection.update({"col_id":id},{$set:{"col_name":name}},function(e,docs){

            console.log(docs);
            if (e) throw e;
            else{
                console.log('data updated');
            }
        });

    };

    this.delete = function (id) {
        var collection = db.get('college');
        collection.remove(id,function(e,docs){

            console.log("Docs:" + docs);
            if (e) throw e;
            else{
                console.log('data deleted :' + id);
            }
        });

    };

    this.retrieve =function (info) {
        db.query('SELECT * FROM `college` WHERE `col_id`=?'[info.col_id],function (err,result) {

        })
    };


    this.getcol_id=function () {
        return this.data.col_id;

    };


    this.getcol_name = function () {
        return this.data.col_name;
    }


};//end of college class

module.exports=College;