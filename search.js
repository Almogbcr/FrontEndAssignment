//Using Node Modules
const fs = require('fs');
const path = require('path');

//Define first Dir
var dir = __dirname;

//Define Arguments for CMD NodeJS
var extention = "."+process.argv[2];
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

    var wordFound = false;
    if (word === undefined  || filter === undefined) {
        getHelp();
    }else {

        //Getting Files in Dir
        var files = fs.readdirSync(startPath);
        //For looping:
        //1.joins the specified path segments into one path
        //2.Checking the status of the file (Exist or Not)
        //3.Checking if I reached Directory
        //4.If not reaching directory , check for file
        //5.If file was found read from it
        //6.If the file got the word I defined print where the file can be found

        for (var i = 0; i < files.length; i++) {
            //join paths
            var fileName = path.join(startPath, files[i]);
            //Checking the status of the file (Exist or Not)
            var stat = fs.lstatSync(fileName);
            //Check if it is directory
            if (stat.isDirectory()) {

                //What happens if found file instead of directory
            if(fileSearch(fileName, filter, word)){
                wordFound = true;
            }
            } else {
                //Reading from the File
                if (path.extname(fileName) === filter || wordFound === true) {
                    const fileContent = fs.readFileSync(fileName);
                    const regex = new RegExp('\\b' + word + '\\b','i');
                    if (regex.test(fileContent)) {
                        wordFound = true;
                        console.log(fileName);
                    }
                }
            }
        }
    }
    return wordFound;
}
if(!fileSearch(dir, extention, word)){
    console.log("No Such File")
};
