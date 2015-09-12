
var fs=require('fs');


function getMovieList(){
var list={};

var fs = require('fs');
var array = fs.readFileSync('tests.txt').toString().split("\n");
for(i in array) {
    array[i]=array[i].split(">");
}


return array;

}



module.exports=getMovieList();
