const fs = require('fs');
const path = require('path');
var dir = "C:\\MyFolder";
var extention = process.argv[2];
var word = process.argv[3];
var found = false;

//File name
var fullFileName = path.basename(process.argv[1]);
var mExtention = path.extname(fullFileName);
var mFileName = path.basename(fullFileName,mExtention);
//Service Name
var fullServiceName = path.basename(process.argv[0]);
var serviceExt = path.extname(fullServiceName);
var serviceName = path.basename(fullServiceName,serviceExt);

function getHelp(){
    console.log("Usage: " + serviceName + " " + mFileName + " [EXT] [TEXT]");
}

function fileSearch(startPath, filter , word) {
    //Check if Folder exists
    if(!fs.existsSync(startPath)) {
        console.log("Creating Dir");
        fs.mkdirSync(startPath);
        console.log("Folder Created");
    }
    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length ; i++) {
        var fileName = path.join(startPath,files[i]);
        var stat = fs.lstatSync(fileName);
        if (stat.isDirectory()){
            found = found || fileSearch(fileName,filter,word);
        } else {
                fs.readFile(fileName, 'utf8', function (err, data) {
                    if (err) throw err;
                    if(data.localeCompare(word) >= 0){
                        console.log(fileName);
                        found = true;
                    }
                });
            }
    }
    return found;

}
if(!fileSearch(dir , extention , word)){
    
}