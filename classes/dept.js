/**
 * Created by arun on 16/09/2016.
 */
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://the-wire:Success%401996@ds061076.mlab.com:61076/feed-db');

var Department=function (info) {

    this.data = {
        col_id: null,
        dept_id: null,
        dept_name: null
    };
    this.set = function (info) {
        for(var p in this.data){
            if(this.data[p] !=='undefined'){
                this.data[p]=info[p];
            }

        }
        console.log(this.data);

        const collection = db.get('department');
        collection.insert(this.data, function(e,docs){
            console.log(docs);
            if (e) throw e;
            else{
                console.log('data added');
            }
        });

    };

    this.update = function (id, name) {
        var collection = db.get('department');
        collection.update({"dep_id":id},{$set:{"dep_name":name}},function(e,docs){

            console.log(docs);
            if (e) throw e;
            else{
                console.log('data updated');
            }
        });
    };

    this.delete = function (req) {
        const collection = db.get('department');

        collection.remove(req,function(err, result){

            if (err){
                console.log('Error occured while deleting data' + JSON.stringify(req)+"|"+JSON.stringify(result));
                throw err;
            }
            else{
                console.log('data deleted : ' + col_id +"|"+ dept_id+"|"+JSON.stringify(result));
            }
        });


    };

    this.retrieve =function (info) {
        db.query('SELECT * FROM `department` WHERE `dept_id`=?'[info.dept_id],function (err,result) {

        })
    };


    this.getcol_id=function () {
        return this.data.col_id;

    };


    this.getdept_id=function () {
        return this.data.dept_id;

    };

    this.getdept_name = function () {
        return this.data.dept_name;
    }


};//end of professor class




module.exports=Department;