const fs = require('fs');
const path = require('path');
var dir = "C:\\MyFolder";
var word = "Ori";

//console.log("Usage : Node search [EXT] [TEXT]");

function fileSearch(startPath,filter,word) {
    //Check if Folder exists
    if(!fs.existsSync(startPath)) {
        console.log("Folder not found " + startPath);
        console.log("Creating Dir");
        fs.mkdirSync(startPath);
        console.log("Folder Created");
    }else if (fs.existsSync(startPath)){
        //console.log("Folder already exists");
    }

    var files = fs.readdirSync(startPath);

    for (var i = 0; i < files.length ; i++) {
        var fileName = path.join(startPath,files[i]);
        var stat = fs.lstatSync(fileName);
        if (stat.isDirectory()){
            fileSearch(fileName,filter);
        }
        else if (fileName.indexOf(filter) >= 0){
            console.log(fileName);
        }

    }
}


//fileSearch(dir,'.txt',word);

