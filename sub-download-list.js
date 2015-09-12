'use strict';
var para=process.argv.slice(2).toString().replace(',',' ');
var chalk = require('chalk');
var async = require('async');
var failed=[];
var parameterCheck=require('./parameterCheck.js');
var success=0;
var len;
// scrapper includes//
var getsubtitleLink=require('./node_modules/subscene/lib/getSubLink.js');
var scrapDownloadLink=require('./node_modules/subscene/lib/scrapDownloadLink.js');
//deepLoader includes//////
var  deepLoader= require('./deepLoader.js');



parameterCheck(para);

deepLoader(para,function(movieNameList){
  len=movieNameList.length;
if(movieNameList.length<1){
  console.log(chalk.inverse("ERROR DETECTED:"));
  console.log("\n",chalk.bgRed("Error   "),chalk.bgYellow("0")," Movies detected in",para.toString().toUpperCase());
  process.exit(0);
}

console.log(chalk.inverse(chalk.bgGreen("Movies Detected"),movieNameList.length-1));
var movieName,moviePath;

async.times(movieNameList.length-1,function(n,next){
   movieName=movieNameList[n][0].toString();
   moviePath=movieNameList[n][1].toString();
  console.log(chalk.bgRed(n)+" "+chalk.bgRed("movieName")+chalk.bgBlue(movieName.toString(),"     "+chalk.bgRed("language:")+"english"));

  getsubtitleLink(movieName,"english",movieNameList[n][1],function(err,fileName,data){

    if(err){
      failed.push(movieNameList[n][0].toString());
      console.log("");
      console.log(" ",chalk.bgRed("  ERROR: "),"retriving subtitle for movie:",chalk.bgYellow(movieNameList[n][0])," from db");
      return;
    }

    console.log("");
    console.log(" ",chalk.bgGreen(" SUCCESS:")," subtitle file for",chalk.bgYellow(movieNameList[n][0]),"has been Downloaded.");
    success=success+1;
    next(err,fileName,data);
  });


},function(e){
  console.log("done");

},function(){//console.log("hello")
}) ;



return ;
}   );

process.on('exit',function(){
console.log("\n\n\n",chalk.inverse("      #info:      "),"\n","\n   DOWNLOADED",chalk.blue(success),"OUT OF",chalk.blue(len));

});
