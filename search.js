//Using Node Modules
const fs = require('fs');
const path = require('path');
//Define first Dir
var dir = "C:\\MyFolder";
//Define Arguments for CMD NodeJS
var extention = process.argv[2];
var word = process.argv[3];

//Service Name
var fullServiceName = path.basename(process.argv[0]);
var serviceExt = path.extname(fullServiceName);
var serviceName = path.basename(fullServiceName, serviceExt);
//File name
var fullFileName = path.basename(process.argv[1]);
var mExtention = path.extname(fullFileName);
var mFileName = path.basename(fullFileName,mExtention);


function getHelp(){
    console.log("Usage: " + serviceName + " " + mFileName + " [EXT] [TEXT]");
}

function fileSearch(startPath, filter, word) {
    //Check if Folder exists
    if (!fs.existsSync(startPath)) {
        console.log("Creating Dir");
        fs.mkdirSync(startPath);
        console.log("Folder Created");
    }

    //Getting Dir Name
    var files = fs.readdirSync(startPath);

    //For looping:
    //1.joins the specified path segments into one path
    //2.Checking the status of the file (Exist or Not)
    //3.Checking if I reached Directory
    //4.If not reaching directory , check for file
    //5.If file was found read from it
    //6.If the file got the word I defined print where the file can be found
    for (var i = 0; i < files.length ; i++) {

        //join paths
        var fileName = path.join(startPath, files[i]);

        //Checking the status of the file (Exist or Not)
        var stat = fs.lstatSync(fileName);

        //Check if it is directory
        if (stat.isDirectory()){
            //What happens if found file instead of directory
            fileSearch(fileName, filter, word);
        } else {
            //Reading from the File
            fs.readFile(fileName, 'utf8', function (err, data) {
                if (err) throw err;
                //Printing the files that contains the defined word
                if(data.localeCompare(word) >= 0){
                    console.log(fileName);
                } else {
                    console.log("No such file");
                }

            });
        }
    }

}

fileSearch(dir, extention, word);

