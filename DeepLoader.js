'use strict';

var fs = require('fs');
var path = require('path');
var videoExtensions = require('video-extensions');
var extns = Object.create(null);
var async=require("async");
var done=false;

var filesArray = [];

videoExtensions.forEach(function (el) {
	el = extns[el] = true;
});



var q = async.queue(function (task, callback) {
   task(callback);

});






function getArr(fileArray){



  var arr=[];

	for(var i=0;i<fileArray.length;i++){

		var dir=fileArray[i].split("\\");
	var x=fileArray[i];
	var y=x.split("\\")[x.split("\\").length-1];
	var movie="";



		for(var z=0;z<y.length-(x.length-x.lastIndexOf('.'));z++){
			if(y.length>1){
			movie+=y[z];
			}
		}

		var path="";
		for(var j=0;j<dir.length-1;j++){
			path+=dir[j]+"\\";

		}

		arr.push([movie,path]);





	}

	return arr;




};


var processFiles = function (fileList, index) {

done=true;
for(var i=0;i<fileList.length;i++){

//for debugging ahmad	console.log("Path Number  "+i+"     "+fileList[i]);

}
};

var traverseDirectory = function (currentDir) {

	q.push(function(mainCall){
	fs.readdir(currentDir,function(err,dir){


     q.push(function(mainCall){
	async.each(dir,function(item,callback){                               //Read dir files of the current directory



	    var filePath = path.join(currentDir, item);



	 q.push(function(mainCall){
		 fs.stat(filePath,function(err,stats){


			mainCall(null);



			 if (stats.isFile() && path.extname(filePath).slice(1).toLowerCase() in extns) {

      if(filesArray.indexOf(filePath)<=-1){
             filesArray.push(filePath);}


			 callback(null);

		} else if (stats.isDirectory()) {



		traverseDirectory(filePath);

		callback(null);

		}

	 })


	 })

	}
	 ,function(err){  })

	 mainCall(null);
	 })

});mainCall(null);
	})

};


var getFilesDirectories = function (path,callback) {
		traverseDirectory(path);

		process.on("beforeExit",function(){

	if(!done){

		var twoDim=getArr(filesArray);
			callback(twoDim);


	    processFiles(twoDim);
	}


	});

}




module.exports=getFilesDirectories;
