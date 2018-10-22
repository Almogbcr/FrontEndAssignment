var express = require('express');
var app = express();
var bodyPaser = require('body-parser');

const PORT = 3000;

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended : false}));

app.listen(PORT, function (){
    console.log("Running on port " + PORT)
});