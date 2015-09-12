'use strict';
var path = require('path');
var fs=require('fs');
var p = process.cwd();
var param = process.argv.slice(2);
var request = require('request');
var cheerio = require('cheerio');
var chalk = require('chalk');
var dirString = path.dirname(fs.realpathSync(__filename));
var $ = require('cheerio');

// scrapper includes//
var getsubtitleLink=require('./node_modules/subscene/lib/getSubLink.js');
var scrapDownloadLink=require('./node_modules/subscene/lib/scrapDownloadLink.js');
var langCode=require('./node_modules/subscene/lib/langCodes.js');
///////////////
function getParameter(){
  var para=param.toString();

  var lang=para.split(",")[para.split(",").length-1];
  var name="";
  for(var i=0;i<para.split(",").length-1;i++){
    if(para.split(",").length-2>i){
    name+=para.split(",")[i]+" ";
}
else {
  name+=para.split(",")[i];
}
  }

return ""+name+","+lang;

}




var para=getParameter().split(",");
console.log(chalk.inverse("query:")+"\n\n"+chalk.bgBlue("subName:"+para[0]+"\t"+"Language:"+para[1]));
//getsubtitleLink('Frozen [2013] BRRip XviD-RARBG',"english",function(data){

getsubtitleLink(para[0].toString(),para[1].toString(),function(err,fileName,data){
  if(err){
    console.log(chalk.red("error retriving subtitles from db"));
    return;
  }

  console.log("");
  console.log("subtitle file for",chalk.bgGreen(para[0]),"has been Downloaded:",chalk.bgGreen(fileName));


});
