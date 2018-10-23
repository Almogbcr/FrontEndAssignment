const fs = require('fs');

var extension = ".txt";
var text = "ori";



function helpMessage (){
    console.log("Usage node search [EXT] [TEXT]");
}

function lookInTxtFiles(){
        fs.readFile('almog.txt' , 'utf8' , function (err , data) {
            if (err) throw  err;
            console.log(data)
        })
}

lookInTxtFiles();


