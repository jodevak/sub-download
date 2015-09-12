var chalk = require('chalk');



function paramCheck(para){

if(para==="" || para===undefined){
console.log(chalk.inverse("ERROR DETECTED:"));
var example_node_file=process.argv.slice(1).toString().split('\\');
var ex=example_node_file[example_node_file.length-1];
  console.log("\n",chalk.bgRed("ERROR!"),"Eenter location for deep searching", chalk.inverse("Example:") , "node ",ex,"c:\\movies");
  process.exit(0);

};

};


module.exports=paramCheck;
